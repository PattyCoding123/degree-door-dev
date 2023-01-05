import { type NextPage } from "next";
import { useRouter } from "next/router";

import { trpc } from "../../utils/trpc";
import ForumForm, { type ForumFormData } from "../../components/forms/ForumForm";
import DegreeNavbar from "../../components/DegreeNavbar";

const Post: NextPage = () => {
  const { degree } = useRouter().query as { degree: string };
  const createPost = trpc.forum.createPost.useMutation<ForumFormData>();
  const onSubmit = async (data: ForumFormData) => {
    const review = await createPost.mutateAsync({degreeId: degree, formData: data});
    console.log(review);
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
      <DegreeNavbar />
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