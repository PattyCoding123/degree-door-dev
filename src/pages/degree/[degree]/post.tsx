import { type NextPage } from "next";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

import { trpc } from "../../../utils/trpc";
import ForumForm from "../../../components/forms/ForumForm";
import DegreeNavbar from "../../../components/navigation/DegreeNavbar";

const Post: NextPage = () => {
  const router = useRouter();
  const { degree } = router.query;

  // Dependent query, will not run unless degree is defined
  // Push to /404 if page cannot be found.
  const degreeQuery = trpc.forum.getDegreeInfo.useQuery(
    { degreeId: degree as string },
    {
      enabled: typeof degree !== "undefined",
      retry: false,
      onError: () => router.push("/404"),
    }
  );

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
      <Toaster />
      <DegreeNavbar
        active="post"
        degreeName={degreeQuery.data?.name}
        degreeId={degreeQuery.data?.id}
      />
      <main>
        <section>
          <h1 className="p-8 text-center text-4xl text-white">
            Write your Review
          </h1>
          <ForumForm />
        </section>
      </main>
    </div>
  );
};

export default Post;
