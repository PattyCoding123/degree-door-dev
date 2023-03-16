import { trpc } from "../trpc";

const useIsFavorite = (isLoggedIn: boolean, degreeId: string) => {
  const favoriteDegree = trpc.forum.checkIfFavorite.useQuery(
    {
      degreeId: degreeId,
    },
    {
      enabled: isLoggedIn,
    }
  );

  if (favoriteDegree) return true;
  return false;
};

export default useIsFavorite;
