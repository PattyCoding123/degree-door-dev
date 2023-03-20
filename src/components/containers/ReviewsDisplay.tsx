import { useSession } from "next-auth/react";
import { Suspense, useState, lazy } from "react";
import dynamic from "next/dynamic";
// import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundary from "../layouts/ErrorBoundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import loadable from "@loadable/component";

import { useDeleteReview, useReviewQuery } from "../../utils/custom-hooks";
const Review = dynamic(() => import("../Review"), {
  ssr: false,
  loading: () => (
    <div className="text-white">
      <GeneralLoadingIndicator size="extra-large" />
    </div>
  ),
});
// const Review = lazy(async () => {
//   return new Promise((resolve) => setTimeout(resolve, 1000)).then(
//     () => import("../Review")
//   );
// });
import GeneralLoadingIndicator from "../loading-ui/GeneralLoadingIndicator";
import ConfirmationDialog from "../modals/dialogs/ConfirmationDialog";
import { trpc } from "../../utils/trpc";

interface ReviewsDisplayProps {
  degreeId: string;
}

const ReviewsDisplay: React.FC<ReviewsDisplayProps> = ({ degreeId }) => {
  const { data: sessionData } = useSession();
  const [selectedReview, setSelectedReview] = useState<{
    reviewId: string;
    reviewUserId: string | null;
  }>(); // To determine which review to delete
  const [showDialog, setShowDialog] = useState(false); // State to control dialog
  // const [reviews, reviewsQuery] = useReviewQuery(degreeId);
  const { data: reviews } = trpc.forum.getAllReviews.useQuery(
    {
      degreeId: degreeId,
    },
    { useErrorBoundary: true, suspense: true }
  );
  // Procedure to delete a review for that degree forum.
  const deleteReview = useDeleteReview(degreeId);

  return (
    <>
      {/* The confirmation dialog */}
      <ConfirmationDialog
        header="Delete your Review"
        content="Are you sure you want to delete this review? It cannot be recovered after."
        handleOk={() => {
          if (
            typeof selectedReview?.reviewId === "string" &&
            typeof selectedReview?.reviewUserId === "string"
          ) {
            // Delete review if the selectedReview state is not null
            deleteReview.mutate({
              reviewId: selectedReview.reviewId,
              reviewUserId: selectedReview.reviewUserId,
            });
          }
          setSelectedReview(undefined); // Reset selectedReview state
          setShowDialog(false); // Remove ConfirmationDialog
        }}
        handleCancel={() => {
          setSelectedReview(undefined); // Reset selectedReview state
          setShowDialog(false); // Remove ConfirmationDialog
        }} // close dialog
        show={showDialog}
        okBtnText="Delete"
      />

      {reviews?.map((review) => (
        // ! Review handleClick will set the selectedReviewState and render the ConfirmationDialog
        // ! Reviews are only deletable by authenticated authors and if the userIds match.
        <Review
          canDelete={sessionData?.user?.id === review.userId}
          key={review.id}
          reviewPost={review}
          handleClick={() => {
            setSelectedReview({
              reviewId: review.id,
              reviewUserId: review.userId,
            });
            setShowDialog(true);
          }}
        />
      ))}
    </>
  );
};

export default ReviewsDisplay;
