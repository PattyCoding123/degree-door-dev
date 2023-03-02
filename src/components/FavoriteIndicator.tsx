import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

interface FavoriteProps {
  degreeId: string;
  degreeName: string;
}

const FavoriteIndicator: React.FC<FavoriteProps> = ({
  degreeId,
  degreeName,
}) => {
  const { data: sessionData } = useSession();
  const favoriteQuery = trpc.forum.checkIfFavorite.useQuery(
    {
      degreeId: degreeId,
    },
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const addFavorite = trpc.forum.favoriteDegree.useMutation({
    onSuccess: () => {
      favoriteQuery.refetch();
    },
  });

  const removeFavorite = trpc.forum.removeFavoriteDegree.useMutation({
    onSuccess: () => {
      favoriteQuery.refetch();
    },
  });

  if (sessionData?.user !== undefined) {
    return (
      <>
        {favoriteQuery.data ? (
          <AiFillStar
            className="fill-yellow-500 text-3xl hover:animate-pulse hover:cursor-pointer"
            onClick={async () =>
              removeFavorite.mutateAsync({
                degreeId: degreeId,
              })
            }
          />
        ) : (
          <AiOutlineStar
            className="text-3xl hover:animate-pulse hover:cursor-pointer"
            onClick={async () =>
              addFavorite.mutateAsync({
                degreeId: degreeId,
                degreeName: degreeName,
              })
            }
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
