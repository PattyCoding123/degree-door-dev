import { type NextPage } from "next";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

import { trpc } from "../../../utils/trpc";
import ForumForm from "../../../components/forms/ForumForm";
import ForumLayout from "../../../components/layouts/ForumLayout";

// The Write page will render the forum for creating a review.
const Write: NextPage = () => {
  const router = useRouter();
  const { degree } = router.query;

  // Dependent query, will not run unless degree is defined
  // Push to /404 if page cannot be found.
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

  return (
    <ForumLayout
      title="Degree Door Forum Post Creation"
      description="Degree Door forum post creation page"
      degreeId={degreeQuery.data?.id}
      degreeName={degreeQuery.data?.name}
      active="write"
    >
      {/* Toaster component will react-hot-toast messages */}
      <Toaster />
      {degreeQuery.isSuccess && (
        <main>
          <h1 className="p-8 text-center text-4xl text-white">
            Write your Review
          </h1>
          <ForumForm degreeId={degreeQuery.data.id} />
        </main>
      )}
    </ForumLayout>
  );
};

export default Write;
