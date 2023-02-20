import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";

import { trpc } from "../../../utils/trpc";
import DegreeNavbar from "../../../components/navigation/DegreeNavbar";
import Review from "../../../components/Review";

const ReviewsPage: NextPage = () => {
  const router = useRouter();
  const { degree } = router.query;

  // Dependent query, will not run unless degree is definied
  // Push to page /404 if degree info is not found
  const degreeQuery = trpc.forum.getDegreeInfo.useQuery(
    { degreeId: degree as string },
    {
      enabled: typeof degree !== "undefined",
      retry: false,
      onError: () => router.push("/404"),
    }
  );
  const queryReviews = trpc.forum.getAllReviews.useQuery(
    { degreeId: degree as string },
    { enabled: typeof degree === "string" }
  );

  const deleteReview = trpc.forum.deleteReview.useMutation({
    onSuccess: () => {
      queryReviews.refetch();
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
    <div className="max-w-screen min-h-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
      <Toaster />
      <DegreeNavbar
        active="reviews"
        degreeName={degreeQuery.data?.name}
        degreeId={degreeQuery.data?.id}
      />
      <main className="flex flex-col">
        <div
          className="relative mx-auto mt-8 h-80 w-2/3 rounded-xl 
          border bg-gradient-to-b from-rose-100 to-teal-100 shadow-2xl"
        >
          <section className="absolute inset-0 flex flex-col justify-center gap-2 text-center">
            <h1 className="text-4xl font-bold md:text-6xl">
              {degreeQuery.data?.name}
            </h1>
            <p className="text-xl md:text-3xl">Reviews</p>
          </section>
        </div>
        <section className="my-8 flex flex-col items-center justify-center gap-8 align-middle">
          {queryReviews.data?.map((review) => (
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
    </div>
  );
};

export default ReviewsPage;
