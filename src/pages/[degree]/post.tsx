import { type NextPage } from "next";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

import ForumForm from "../../components/forms/ForumForm";
import DegreeNavbar from "../../components/DegreeNavbar";
import { trpc } from "../../utils/trpc";

const Post: NextPage = () => {
  const { degree } = useRouter().query as { degree: string | undefined };

  // Dependent query, will not run unless degree is definied: !!variable => boolean
  const degreeQuery = trpc.forum.getDegreeInfo.useQuery({ degreeId: degree! }, { enabled: !!degree });

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
          <h1 className="text-white text-4xl text-center p-8">Write your Review</h1>
          <ForumForm />
        </section>
      </main>
    </div>
  );
}

export default Post;