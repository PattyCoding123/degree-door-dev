import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";

import { trpc } from "../../../utils/trpc";
import Review from "../../../components/Review";
import ForumLayout from "../../../components/layouts/ForumLayout";

const ReviewsPage: NextPage = () => {
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

  const reviewsQuery = trpc.forum.getAllReviews.useQuery(
    {
      degreeId: degree as string,
    },
    {
      enabled: degreeQuery.isSuccess,
    }
  );

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
      <Toaster />
      {degreeQuery.isSuccess && (
        <>
          <main className="flex flex-col">
            <div
              className="relative mx-auto mt-8 h-80 w-2/3 rounded-xl 
                border bg-gradient-to-b from-rose-100 to-teal-100 shadow-2xl"
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
                <Review
                  key={review.id}
                  reviewPost={review}
                  handleClick={async (reviewId: string) => {
                    await deleteReview.mutateAsync({ reviewId: reviewId });
                  }}
                />
              ))}
            </section>
          </main>
        </>
      )}
    </ForumLayout>
  );
};

export default ReviewsPage;
