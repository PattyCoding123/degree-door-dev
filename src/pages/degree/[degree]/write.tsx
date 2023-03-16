import { type NextPage } from "next";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

import ForumForm from "../../../components/forms/ForumForm";
import ForumLayout from "../../../components/layouts/ForumLayout";
import { useDegreeQuery } from "../../../utils/custom-hooks";

// The Write page will render the forum for creating a review.
const Write: NextPage = () => {
  const router = useRouter();
  const { degree } = router.query;

  const degreeQuery = useDegreeQuery(degree);

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
