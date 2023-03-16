import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";

import { trpc } from "../../../utils/trpc";
import Review from "../../../components/Review";
import ForumLayout from "../../../components/layouts/ForumLayout";
import ConfirmationDialog from "../../../components/modals/dialogs/ConfirmationDialog";

// The Reviews page will render all the reviews for a specific degree forum.
// It will also allow user's to delete reviews if they are the author
const ReviewsPage: NextPage = () => {
  const { data: sessionData } = useSession(); // Get session data
  const [showDialog, setShowDialog] = useState(false); // State to control dialog
  const [selectedReview, setSelectedReview] = useState<string>(); // To determine which

  const router = useRouter();
  const { degree } = router.query;

  // Get utils from trpc.useContext() for query invalidation
  const utils = trpc.useContext();

  // Dependent query, will not run unless degree is defined
  // Push to page /404 if degree info is not found
  const degreeQuery = trpc.forum.getDegreeInfo.useQuery(
    { degreeId: degree as string },
    {
      enabled: typeof degree !== "undefined",
      retry: (failureCount, error) => {
        if (error.message === "NOT_FOUND") {
          router.push("/404");
          return false;
        }

        if (failureCount + 1 < 4) {
          router.push("/500");
          return false;
        }
        return true;
      },
    }
  );

  // Only query for reviews if the degreeQuery is successful
  const reviewsQuery = trpc.forum.getAllReviews.useQuery(
    {
      degreeId: degree as string,
    },
    {
      enabled: degreeQuery.isSuccess,
    }
  );

  // Procedure to delete a review for that degree forum.
  const deleteReview = trpc.forum.deleteReview.useMutation({
    onSuccess: () => {
      // Invalidate queries only for the degree forum from which
      // the degree was deleted from.
      utils.forum.getAllReviews.invalidate({ degreeId: degree as string });
      toast.success("Review successfully deleted!", {
        position: "bottom-center",
        className: "text-xl",
      });
    },
    onError: () =>
      toast.error("There was an error deleting the post!", {
        position: "bottom-center",
        className: "text-xl",
      }),
  });

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
        <main className="flex flex-col">
          <div
            className="relative mx-auto mt-8 h-80 w-2/3 rounded-xl 
                border bg-primary shadow-2xl"
          >
            <section className="absolute inset-0 flex flex-col justify-center gap-2 text-center">
              <h1 className="text-4xl font-bold md:text-6xl">
                {degreeQuery.data.name}
              </h1>
              <p className="text-xl md:text-3xl">Reviews</p>
            </section>
          </div>
          <section className="my-8 flex flex-col items-center justify-center gap-8 align-middle">
            {reviewsQuery.data?.map((review) => (
              // ! Review handleClick will set the selectedReviewState and render the ConfirmationDialog
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
