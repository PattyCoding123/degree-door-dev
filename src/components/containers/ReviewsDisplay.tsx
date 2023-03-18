import { useSession } from "next-auth/react";
import { useState } from "react";

import { useDeleteReview, useReviewQuery } from "../../utils/custom-hooks";
import { Button } from "../Buttons";
import Review from "../Review";
import GeneralLoadingIndicator from "../loading-ui/GeneralLoadingIndicator";
import ConfirmationDialog from "../modals/dialogs/ConfirmationDialog";

interface ReviewsDisplayProps {
  enableQuery: boolean;
  degreeId: string;
}

const ReviewsDisplay: React.FC<ReviewsDisplayProps> = ({
  enableQuery,
  degreeId,
}) => {
  const { data: sessionData } = useSession();
  const [selectedReview, setSelectedReview] = useState<{
    reviewId: string;
    reviewUserId: string | null;
  }>(); // To determine which review to delete
  const [showDialog, setShowDialog] = useState(false); // State to control dialog
  const reviewsQuery = useReviewQuery(enableQuery, degreeId);

  // Procedure to delete a review for that degree forum.
  const deleteReview = useDeleteReview(degreeId);

  if (reviewsQuery.isLoading || reviewsQuery.isFetching) {
    return (
      <div className="flex flex-col items-center text-white">
        <GeneralLoadingIndicator size="extra-large" />
      </div>
    );
  }

  if (reviewsQuery.isError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-2xl text-white">
          There was a problem fetching the reviews...
        </p>
        <Button
          className="w-24 bg-red-500"
          onClick={() => reviewsQuery.refetch()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* The confirmation dialog */}
      <ConfirmationDialog
        header="Delete your Review"
        content="Are you sure you want to delete this review? It cannot be recovered after."
        handleOk={async () => {
          if (
            typeof selectedReview?.reviewId === "string" &&
            typeof selectedReview?.reviewUserId === "string"
          ) {
            // Delete review if the selectedReview state is not null
            await deleteReview.mutateAsync({
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
      {reviewsQuery.data.length > 0 ? (
        reviewsQuery.data.map((review) => (
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
        ))
      ) : (
        <p className="text-3xl text-white">
          This forum has no reviews. Be the first to write a review!
        </p>
      )}
    </>
  );
};

export default ReviewsDisplay;
