import Router from "next/router";

import { trpc } from "../trpc";

// Custom hook to utilize logic for getDegreeInfo query
const useDegreeQuery = (degree?: string | string[]) => {
  // Dependent query, will not run unless degree is defined
  // Push to 404 if degree cannot be found.
  const degreeQuery = trpc.forum.getDegreeInfo.useQuery(
    { degreeId: degree as string },
    {
      enabled: typeof degree !== "undefined",
      retry: (failureCount, error) => {
        if (error.message === "NOT_FOUND") {
          Router.push("/404");
          return false;
        }

        if (failureCount + 1 < 4) {
          return false;
        }
        return true;
      },
    }
  );

  return degreeQuery;
};

export default useDegreeQuery;
