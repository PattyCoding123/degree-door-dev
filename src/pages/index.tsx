import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import HeroBanner from "../components/HeroBanner";
import Carousel from "../components/Carousel";
import FavoriteDegree from "../components/FavoriteDegree";
import Layout from "../components/layouts/Layout";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const favorites = trpc.forum.getFavorites.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  return (
    <Layout title="Degree Door" description="The Degree Door home page">
      <main>
        <HeroBanner />
        <section>
          <Carousel />
        </section>
        <section className="mt-10">
          {favorites.data ? (
            <div className="flex h-4/5 flex-col items-center justify-center">
              <h2 className="mb-4 text-2xl font-semibold">Favorited Degrees</h2>
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 sm:flex-row">
                {favorites.data.map((favorite) => (
                  <FavoriteDegree
                    key={favorite.degreeId}
                    degreeId={favorite.degreeId}
                    degreeName={favorite.degree.name}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>Hello</p>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default Home;
