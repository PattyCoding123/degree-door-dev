import { type NextPage } from "next";

import ForumForm from "../components/forms/ForumForm";

const Post: NextPage = () => {


  return (
    <div>
      This is my post page.
      <ForumForm />
    </div>
  );
}

export default Post;