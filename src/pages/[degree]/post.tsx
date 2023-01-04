import { type NextPage } from "next";

import { trpc } from "../../utils/trpc";
import ForumForm, { type ForumFormData } from "../../components/forms/ForumForm";
import DegreeNavbar from "../../components/DegreeNavbar";

const Post: NextPage = () => {
  const createPost = trpc.forum.createPost.useMutation();

  const onSubmit = async (data: ForumFormData) => {
    createPost.mutate(data);
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-t from-blue-800 to-indigo-900">
      <DegreeNavbar />
      <main>
        <section>
          <h1 className="text-slate-200 text-4xl text-center p-8">Write your Review</h1>
          <ForumForm onSubmit={onSubmit}/>
        </section>
      </main>
    </div>
  );
}

export default Post;