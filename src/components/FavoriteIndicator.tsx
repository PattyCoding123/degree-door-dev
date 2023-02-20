import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSession } from "next-auth/react";

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

  const favoriteMutation = trpc.forum.favoriteDegree.useMutation({
    onSuccess: () => {
      console.log("Degree was favorited");
    },
  });

  const unfavoriteMutation = trpc.forum.unfavoriteDegree.useMutation({
    onSuccess: () => {
      console.log("Degree was removed from your favorites");
    },
  });

  if (sessionData?.user !== undefined) {
    return (
      <>
        {favoriteQuery.data ? (
          <AiFillStar
            className="text-3xl text-yellow-500 hover:animate-pulse hover:cursor-pointer"
            onClick={() => console.log("Unfavorited")}
          />
        ) : (
          <AiOutlineStar
            className="text-3xl hover:animate-pulse hover:cursor-pointer"
            onClick={() => console.log("Favorited")}
          />
        )}
      </>
    );
  }
  return (
    <button disabled={true}>
      <AiOutlineStar className="text-3xl hover:animate-pulse hover:cursor-pointer" />
    </button>
  );
};

export default FavoriteIndicator;
