import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

import Review from "../../../components/Review";
import ForumLayout from "../../../components/layouts/ForumLayout";
import ConfirmationDialog from "../../../components/modals/dialogs/ConfirmationDialog";
import {
  useDegreeQuery,
  useReviewQuery,
  useDeleteReview,
} from "../../../utils/custom-hooks";

// The Reviews page will render all the reviews for a specific degree forum.
// It will also allow user's to delete reviews if they are the author
const ReviewsPage: NextPage = () => {
  const { data: sessionData } = useSession(); // Get session data
  const [showDialog, setShowDialog] = useState(false); // State to control dialog
  const [selectedReview, setSelectedReview] = useState<string>(); // To determine which

  const router = useRouter();
  const { degree } = router.query;

  // Dependent query, will not run unless degree is defined
  // Push to page /404 if degree info is not found
  const degreeQuery = useDegreeQuery(degree);

  // Only query for reviews if the degreeQuery is successful
  const reviewsQuery = useReviewQuery(degreeQuery.isSuccess, degree as string);

  // Procedure to delete a review for that degree forum.
  const deleteReview = useDeleteReview(degree);

  return (
    <ForumLayout
      title="Degree Door Forum Reviews"
      description="Degree Door forum reviews page"
      degreeId={degreeQuery.data?.id}
      degreeName={degreeQuery.data?.name}
      active="reviews"
    >
      {/* The confirmation dialog */}
      <ConfirmationDialog
        header="Delete your Review"
        content="Are you sure you want to delete this review? It cannot be recovered after."
        handleOk={async () => {
          if (typeof selectedReview === "string") {
            // Delete review if the selectedReview state is not undefined
            deleteReview.mutateAsync({ reviewId: selectedReview });
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
      <Toaster />
      {/* Toaster component for rendering react-hot-toast messages */}
      {degreeQuery.isSuccess && (
        // ! Only render the degrees if the degreeQuery is a success
        <main className="flex flex-1 flex-col p-8">
          <div
            className="relative mx-auto mt-8 flex h-80 w-2/3 
            flex-col items-center justify-center rounded-xl border bg-primary shadow-2xl"
          >
            <h1 className="text-4xl font-bold md:text-6xl">
              {degreeQuery.data.name}
            </h1>
            <p className="text-xl md:text-3xl">Reviews</p>
          </div>
          <section className="mt-16 mb-8 flex flex-col items-center justify-center gap-8">
            {reviewsQuery.data?.map((review) => (
              // ! Review handleClick will set the selectedReviewState and render the ConfirmationDialog
              // ! Reviews are only deletable by authenticated authors and if the userIds match.
              <Review
                canDelete={sessionData?.user?.id === review.userId}
                key={review.id}
                reviewPost={review}
                handleClick={() => {
                  setSelectedReview(review.id);
                  setShowDialog(true);
                }}
              />
            ))}
          </section>
        </main>
      )}
    </ForumLayout>
  );
};

export default ReviewsPage;
