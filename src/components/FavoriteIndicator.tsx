import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Tooltip from "./Tooltip";

interface FavoriteProps {
  degreeId: string;
}

// The FavoriteIndicator is a component that notifies authed-users
// whether they favorited a degree. It also will allow them to favorite
// or unfavorite degrees.
const FavoriteIndicator: React.FC<FavoriteProps> = ({ degreeId }) => {
  // ! FavoriteIndicator functionalities will only work if the user is logged in.
  const { data: sessionData } = useSession();

  // Use to invalidate query.
  const utils = trpc.useContext();
  // Checks whether the user favorited the degree using database records.
  const favoriteQuery = trpc.forum.checkIfFavorite.useQuery(
    {
      degreeId: degreeId,
    },
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  // Mutation procedure to add a degree to a user's favorites
  const addFavorite = trpc.forum.favoriteDegree.useMutation({
    onSuccess: () => {
      // Invalidate queries
      utils.forum.checkIfFavorite.invalidate({ degreeId: degreeId });
      utils.forum.getFavorites.invalidate();
    },
  });

  // Mutation procedure to remove a degree from the user's favorites
  const removeFavorite = trpc.forum.removeFavoriteDegree.useMutation({
    onSuccess: () => {
      // Invalidate queries
      utils.forum.checkIfFavorite.invalidate({ degreeId: degreeId });
      utils.forum.getFavorites.invalidate();
    },
  });

  // ! Only render functional FavoriteIndicator if the user is logged in
  if (sessionData?.user !== undefined) {
    return (
      <>
        {favoriteQuery.data ? (
          <AiFillStar
            className="fill-yellow-500 text-3xl hover:animate-pulse hover:cursor-pointer"
            onClick={() =>
              removeFavorite.mutate({
                degreeId: degreeId,
              })
            }
          />
        ) : (
          <AiOutlineStar
            className="text-3xl hover:animate-pulse hover:cursor-pointer"
            onClick={() =>
              addFavorite.mutate({
                degreeId: degreeId,
              })
            }
          />
        )}
      </>
    );
  }

  // Render disabled button of empty favorite indicator with a tooltip
  return (
    <Tooltip message="You must be logged in to favorite a degree.">
      <button disabled={true}>
        <AiOutlineStar className="text-3xl hover:animate-pulse hover:cursor-pointer" />
      </button>
    </Tooltip>
  );
};

export default FavoriteIndicator;
