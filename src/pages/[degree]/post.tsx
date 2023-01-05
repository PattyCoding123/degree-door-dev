import { type NextPage } from "next";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";

import { trpc } from "../../utils/trpc";
import ForumForm, { type ForumFormData } from "../../components/forms/ForumForm";
import DegreeNavbar from "../../components/DegreeNavbar";


const Post: NextPage = () => {
  const { degree } = useRouter().query as { degree: string };
  const createPost = trpc.forum.createPost.useMutation<ForumFormData>({
    onSuccess: () => toast.success("Review successfully created!", { position: "bottom-center", className: "text-xl" }),
    onError: () => toast.error("There was an error creating the post!", { position: "bottom-center", className: "text-xl" })
  });

  const onSubmit = async (data: ForumFormData) => {
    const review = await createPost.mutateAsync({degreeId: degree, formData: data});
    if (review) return true;
    else return false;
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
      <Toaster />
      <DegreeNavbar active="post" />
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