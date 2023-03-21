import { useSession } from "next-auth/react";
import { Suspense, useState, lazy } from "react";
import dynamic from "next/dynamic";
// import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundary from "../layouts/ErrorBoundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import loadable from "@loadable/component";

import { useDeleteReview, useReviewQuery } from "../../utils/custom-hooks";
// ! See effect of dynamic import
// const Review = dynamic(
//   async () => {
//     return new Promise((resolve) => setTimeout(resolve, 4000)).then(
//       () => import("../Review")
//     );
//   },
//   {
//     ssr: false,
//     loading: () => <ReviewSkeleton />,
//   }
// );

const Review = dynamic(() => import("../Review"));
import GeneralLoadingIndicator from "../loading-ui/GeneralLoadingIndicator";
import ConfirmationDialog from "../modals/dialogs/ConfirmationDialog";
import { trpc } from "../../utils/trpc";
import { IoMdThumbsDown, IoMdThumbsUp } from "react-icons/io";

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
  const [data, query] = trpc.forum.getAllReviews.useSuspenseQuery(
    { degreeId },
    { retry: false }
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

      {data.map((review) => (
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

const ReviewSkeleton: React.FC = () => {
  return (
    <>
      <div className="flex w-2/3 animate-pulse flex-col gap-4 rounded-xl border bg-slate-200 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-center text-lg font-bold" />
        </div>
        <section className="flex">
          <div className="flex w-16 items-center justify-center rounded border-2 border-green-700 bg-primary p-2">
            <IoMdThumbsUp className="text-lg text-green-700" />
          </div>
          <div className="w-full rounded border-r-4 border-green-700 bg-primary p-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">PROS</h2>
              <p className="text-md text-gray-600" />
            </div>
          </div>
        </section>
        <section className="flex">
          <div className="flex w-16 items-center justify-center rounded border-2 border-red-700 bg-primary p-2">
            <IoMdThumbsDown className="text-lg text-red-700" />
          </div>
          <div className="w-full rounded border-r-4 border-red-700 bg-primary p-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">CONS</h2>
              <p className="text-md text-gray-600" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
