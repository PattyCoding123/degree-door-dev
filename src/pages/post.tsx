import { type NextPage } from "next";

import ForumForm from "../components/forms/ForumForm";

const Post: NextPage = () => {


  return (
    <main className="h-screen w-screen bg-gradient-to-t from-blue-800 to-indigo-900">
      This is my post page.
      <ForumForm />
    </main>
  );
}

export default Post;