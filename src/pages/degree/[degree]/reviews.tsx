import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { lazy } from "react";

import ForumLayout from "../../../components/layouts/ForumLayout";
import { useDegreeQuery } from "../../../utils/custom-hooks";
const ReviewsDisplay = lazy(
  () => import("../../../components/containers/ReviewsDisplay")
);

// The Reviews page will render all the reviews for a specific degree forum.
// It will also allow user's to delete reviews if they are the author
const ReviewsPage: NextPage = () => {
  const router = useRouter();
  const { degree } = router.query;

  // Dependent query, will not run unless degree is defined
  // Push to page /404 if degree info is not found
  const degreeQuery = useDegreeQuery(degree);

  return (
    <ForumLayout
      title="Degree Door Forum Reviews"
      description="Degree Door forum reviews page"
      degreeId={degreeQuery.data?.id}
      degreeName={degreeQuery.data?.name}
      active="reviews"
    >
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
            <ReviewsDisplay degreeId={degreeQuery.data.id} />
          </section>
        </main>
      )}
    </ForumLayout>
  );
};

export default ReviewsPage;
