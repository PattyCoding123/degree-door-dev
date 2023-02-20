import { AiOutlineStar } from "react-icons/ai";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Favorite = () => {
  const { data: sessionData } = useSession();

  if (sessionData?.user !== undefined) {
    return <AiOutlineStar />;
  }
  return (
    <button disabled={true}>
      <AiOutlineStar />
    </button>
  );
};

export default Favorite;
