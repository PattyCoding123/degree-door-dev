import Router from "next/router";

import { trpc } from "../trpc";

// Custom hook to utilize logic for getDegreeInfo query
const useDegreeQuery = (degree?: string | string[]) => {
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
          Router.push("/500");
          return false;
        }
        return true;
      },
    }
  );

  return degreeQuery;
};

export default useDegreeQuery;
