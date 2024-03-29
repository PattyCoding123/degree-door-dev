import { useSession, signIn } from "next-auth/react";

import { trpc } from "../../utils/trpc";
import GeneralLoadingIndicator from "../loading-ui/GeneralLoadingIndicator";
import FavoriteDegree from "../FavoriteDegree";

// A component that will render various UI depending
// on the status of the session or favorites.
const FavoritesDisplay: React.FC = () => {
  const { data: sessionData } = useSession();
  const favorites = trpc.forum.getFavorites.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  // Render Log in message if the user's isn't logged in
  if (!sessionData || !sessionData.user) {
    return (
      <p className="mt-16 text-2xl">
        <button className="underline" onClick={() => signIn()}>
          Login
        </button>{" "}
        to start favoriting degrees!
      </p>
    );
  }

  // Render general loading indicator if favorites is fetching
  if (favorites.isLoading || favorites.isFetching) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="mb-4 text-2xl font-semibold">Favorited Degrees</h2>
        <GeneralLoadingIndicator size="extra-large" />
      </div>
    );
  }

  // Render an error message and button to refetch the queries IF
  // there was an error trying to fetch the favorites.
  if (favorites.isError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="mb-4 text-2xl font-semibold">Favorited Degrees</h2>
        <p className="text-2xl">
          There was a problem fetching your favorite degrees...
        </p>
        <button
          className="text-2xl underline hover:text-amber-400 active:text-amber-600"
          onClick={() => favorites.refetch()}
        >
          Retry
        </button>
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
