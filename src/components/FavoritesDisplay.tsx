import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { Button } from "./Buttons";
import GeneralLoadingIndicator from "./loading-ui/GeneralLoadingIndicator";
import FavoriteDegree from "./FavoriteDegree";

const FavoritesDisplay: React.FC = () => {
  const { data: sessionData } = useSession();
  const favorites = trpc.forum.getFavorites.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  if (!sessionData || !sessionData.user) {
    return <p className="mt-4 text-xl">Log in to start favoriting degrees!</p>;
  }

  if (favorites.isFetching) {
    return <GeneralLoadingIndicator size="extra-large" />;
  }

  if (favorites.isError) {
    return (
      <div className="flex flex-col">
        <p>There was a problem fetching your favorite degrees...</p>
        <Button onClick={() => favorites.refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="flex h-4/5 flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-semibold">Favorited Degrees</h2>
      {favorites.isSuccess && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 md:flex-row">
          {favorites.data.length > 0 ? (
            favorites.data.map((favorite) => (
              <FavoriteDegree
                key={favorite.degreeId}
                degreeId={favorite.degreeId}
                degreeName={favorite.degree.name}
              />
            ))
          ) : (
            <p className="mt-4 text-xl">You have no favorited degrees</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesDisplay;
