import { type NextPage } from "next";
import { Toaster } from "react-hot-toast";

import ForumForm from "../../components/forms/ForumForm";
import DegreeNavbar from "../../components/DegreeNavbar";

const Post: NextPage = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
      <Toaster />
      <DegreeNavbar active="post" />
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