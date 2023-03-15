import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import HeroBanner from "../components/HeroBanner";
import Carousel from "../components/Carousel";
import FavoriteDegree from "../components/FavoriteDegree";
import Layout from "../components/layouts/Layout";
import GeneralLoadingIndicator from "../components/loading-ui/GeneralLoadingIndicator";

// The Home page will render the HeroBanner, degree Carousel, and all favorite
// degrees of a user IF they are logged in and have favorite degrees.
const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const favorites = trpc.forum.getFavorites.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  return (
    <Layout title="Degree Door" description="The Degree Door home page">
      <main className="text-white">
        <HeroBanner />
        <section>
          <Carousel />
        </section>
        <section className="mt-10">
          <div className="flex h-4/5 flex-col items-center justify-center">
            <h2 className="mb-4 text-2xl font-semibold">Favorited Degrees</h2>
            {favorites.isFetching && (
              <GeneralLoadingIndicator size="extra-large" />
            )}
            {sessionData ? (
              favorites.data ? (
                <>
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 md:flex-row">
                    {favorites.data.map((favorite) => (
                      <FavoriteDegree
                        key={favorite.degreeId}
                        degreeId={favorite.degreeId}
                        degreeName={favorite.degree.name}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <p className="mt-4 text-xl">You have no favorited degrees</p>
              )
            ) : (
              <p className="mt-4 text-xl">
                Log in to start favoriting degrees!
              </p>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
