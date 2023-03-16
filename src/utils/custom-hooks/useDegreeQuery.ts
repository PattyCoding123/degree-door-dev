import { useRouter } from "next/router";

import { trpc } from "../trpc";

const useDegreeQuery = (degree?: string | string[]) => {
  const router = useRouter();
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

  return degreeQuery;
};

export default useDegreeQuery;
