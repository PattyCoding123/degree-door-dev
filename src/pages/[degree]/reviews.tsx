import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";

import { trpc } from "../../utils/trpc";
import DegreeNavbar from "../../components/DegreeNavbar";
import Review from "../../components/Review";

const DegreeHome: NextPage = () => {
  const router = useRouter(); 
  const { degree } = router.query as { degree: string };

  const degreeQuery = trpc.forum.getDegreeInfo.useQuery({ degreeId: degree }, { enabled: false });

  const queryReviews = trpc.forum.getAllReviews.useQuery({ degreeId: degree }, { enabled: false });

  const deleteReview = trpc.forum.deleteReview.useMutation({ 
    onSuccess: () => {
      queryReviews.refetch();
      toast.success("Review successfully deleted!", { position: "bottom-center", className: "text-xl" });
    },
    onError: () => toast.error("There was an error deleting the post!", { position: "bottom-center", className: "text-xl" })
  });

  useEffect(() => {
    if (!router.isReady) return;
    queryReviews.refetch();
    degreeQuery.refetch();
  }, [router.isReady]);

  const deleteReviewHandler = async (reviewId: string) => {
    await deleteReview.mutateAsync({ reviewId: reviewId });
  }

  return (
    <div className="max-w-screen min-h-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
      <Toaster />
      <DegreeNavbar active="reviews" />
      <main className="flex flex-col">
        <div 
          className="h-80 mt-8 mx-auto relative border w-2/3 
          rounded-xl shadow-2xl bg-gradient-to-b from-rose-100 to-teal-100"
        >
          <section className="absolute inset-0 flex flex-col gap-2 justify-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold">{degreeQuery.data?.name!}</h1>
            <p className="text-xl md:text-3xl">Reviews</p>
          </section>
        </div>
        <section className="my-8 flex flex-col items-center align-middle justify-center gap-8">
          {queryReviews.data?.map((review) => (
            <Review 
              reviewPost={review}
              handleClick={deleteReviewHandler} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default DegreeHome;