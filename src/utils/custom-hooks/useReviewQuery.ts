import { trpc } from "../trpc";

// Custom hook for the getAllReviews procedure
const useReviewQuery = (degreeQueryStatus: boolean, degree?: string) => {
  // Only query for reviews if enabled
  const reviewsQuery = trpc.forum.getAllReviews.useQuery(
    {
      degreeId: degree as string,
    },
    {
      enabled: degreeQueryStatus,
    }
  );

  return reviewsQuery;
};

export default useReviewQuery;
