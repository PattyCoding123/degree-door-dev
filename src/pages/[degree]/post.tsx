import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";

import { trpc } from "../../utils/trpc";
import ForumForm, { type ForumFormData } from "../../components/forms/ForumForm";
import DegreeNavbar from "../../components/DegreeNavbar";


const Post: NextPage = () => {
  const router = useRouter();
  const { degree } = router.query as { degree: string };

  const degreeQuery = trpc.forum.getDegreeInfo.useQuery({ degreeId: degree }, { enabled: false });

  const createReview = trpc.forum.createReview.useMutation<ForumFormData>({
    onSuccess: () => toast.success("Review successfully created!", { position: "bottom-center", className: "text-xl" }),
    onError: () => toast.error("There was an error creating the post!", { position: "bottom-center", className: "text-xl" })
  });

  useEffect(() => {
    if (!router.isReady) return;
    degreeQuery.refetch();
  }, [router.isReady])

  const onSubmit = async (data: ForumFormData) => {
    const review = await createReview.mutateAsync({degreeId: degree, formData: data});
    if (review) return true;
    else return false;
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
      <Toaster />
      <DegreeNavbar active="post" degreeName={degreeQuery.data?.name!} degreeId={degreeQuery.data?.id!} />
      <main>
        <section>
          <h1 className="text-white text-4xl text-center p-8">Write your Review</h1>
          <ForumForm onSubmit={onSubmit}/>
        </section>
      </main>
    </div>
  );
}

export default Post;