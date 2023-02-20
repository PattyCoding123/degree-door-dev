import { AiOutlineStar } from "react-icons/ai";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import { trpc } from "../utils/trpc";

interface FavoriteProps {
  degreeId: string;
}
const FavoriteIndicator: React.FC<FavoriteProps> = ({ degreeId }) => {
  const { data: sessionData } = useSession();
  const favoriteQuery = trpc.forum.checkIfFavorite.useQuery(
    {
      degreeId: degreeId,
    },
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  if (sessionData?.user !== undefined) {
    return <AiOutlineStar className={favoriteQuery ? "bg-yellow-500" : ""} />;
  }
  return (
    <button disabled={true}>
      <AiOutlineStar />
    </button>
  );
};

export default FavoriteIndicator;
