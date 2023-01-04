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