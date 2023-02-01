import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";

import { trpc } from "../../utils/trpc";
import DegreeNavbar from "../../components/DegreeNavbar";
import Review from "../../components/Review";
import ensure from "../../utils/ensure";

const DegreeHome: NextPage = () => {
  const { degree } = useRouter().query as { degree: string | undefined };

  // Dependent query, will not run unless degree is definied: !!variable => boolean
  const degreeQuery = trpc.forum.getDegreeInfo.useQuery({ degreeId: ensure(degree) }, { enabled: !!degree });
  const queryReviews = trpc.forum.getAllReviews.useQuery({ degreeId: ensure(degree) }, { enabled: !!degree });

  const deleteReview = trpc.forum.deleteReview.useMutation({ 
    onSuccess: () => {
      queryReviews.refetch();
      toast.success("Review successfully deleted!", { position: "bottom-center", className: "text-xl" });
    },
    onError: () => toast.error("There was an error deleting the post!", { position: "bottom-center", className: "text-xl" })
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
          className="h-80 mt-8 mx-auto relative border w-2/3 
          rounded-xl shadow-2xl bg-gradient-to-b from-rose-100 to-teal-100"
        >
          <section className="absolute inset-0 flex flex-col gap-2 justify-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold">{degreeQuery.data?.name}</h1>
            <p className="text-xl md:text-3xl">Reviews</p>
          </section>
        </div>
        <section className="my-8 flex flex-col items-center align-middle justify-center gap-8">
          {queryReviews.data?.map((review) => (
            <Review 
              key={review.id}
              reviewPost={review}
              handleClick={async (reviewId: string) => {await deleteReview.mutateAsync({ reviewId: reviewId });}} 
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default DegreeHome;