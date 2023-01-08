import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from 'react';

import { trpc } from "../../utils/trpc";
import DegreeNavbar from "../../components/DegreeNavbar";
import Review from "../../components/Review";

const DegreeHome: NextPage = () => {
  const router = useRouter();
  const { degree } = router.query as { degree: string };
  const queryReviews = trpc.forum.getAllReviews.useQuery({ degreeId: degree }, { enabled: false });

  useEffect(() => {
    if (!router.isReady) return;
    queryReviews.refetch();
  }, [router.isReady]);

  const deleteReview = (reviewId: string) => {
    console.log(reviewId);
  }

  return (
    <div className="max-w-screen min-h-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
      <DegreeNavbar active="reviews" />
      <main className="flex flex-col">
        <div 
          className="h-80 mt-8 mx-auto relative items-center justify-center flex 
          border w-2/3 rounded-xl shadow-2xl bg-gradient-to-b from-rose-100 to-teal-100"
        >
          <section className="absolute flex flex-col gap-2 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Computer Science</h1>
            <p className="text-xl md:text-3xl">Reviews</p>
          </section>
        </div>
        <section className="my-8 flex flex-col items-center align-middle justify-center gap-8">
          {queryReviews.data?.map((review) => (
            <Review 
              key={review.id}
              course={review.course} 
              pros={review.pros} 
              cons={review.cons} 
              reviewId={review.id} 
              userId = {review.userId}
              handleClick={deleteReview} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default DegreeHome;