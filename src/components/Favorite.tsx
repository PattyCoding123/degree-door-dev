import { AiOutlineStar } from "react-icons/ai";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Favorite = () => {
  const { data: sessionData } = useSession();
  return <AiOutlineStar />;
};

export default Favorite;
