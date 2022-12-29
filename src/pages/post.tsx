import { type NextPage } from "next";

import { trpc } from "../utils/trpc";
import ForumForm, { ForumFormData } from "../components/forms/ForumForm";

const Post: NextPage = () => {
  const createPost = trpc.forum.createPost.useMutation();

  const onSubmit = async (data: ForumFormData) => {
    createPost.mutate(data);
  }

  return (
    <main className="h-screen w-screen bg-gradient-to-t from-blue-800 to-indigo-900">
      <section>
        <h1 className="text-slate-200 text-4xl text-center p-8">Write your Review</h1>
        <ForumForm onSubmit={onSubmit}/>
      </section>
    </main>
  );
}

export default Post;