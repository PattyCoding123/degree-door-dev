import { trpc } from "../trpc";

// Custom hook for the getAllReviews procedure
const useReviewQuery = (degree: string) => {
  // Only query for reviews if enabled
  const reviewsSuspenseQuery = trpc.forum.getAllReviews.useSuspenseQuery({
    degreeId: degree,
  });

  return reviewsSuspenseQuery;
};

export default useReviewQuery;
