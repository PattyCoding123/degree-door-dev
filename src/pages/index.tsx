import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";

import { trpc } from "../utils/trpc";
import HeroBanner from "../components/HeroBanner";
import HomeNavbar from "../components/navigation/HomeNavbar";
import Carousel from "../components/Carousel";
import FavoriteDegree from "../components/FavoriteDegree";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const favorites = trpc.forum.getFavorites.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  return (
    <>
      <Head>
        <title>Degree Door</title>
        <meta name="description" content="The Degree Door home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="min-w-screen min-h-screen bg-gradient-to-r
       from-rose-400 via-fuchsia-500 to-indigo-500 text-white"
      >
        <HomeNavbar />
        <main>
          <HeroBanner />
          <section>
            <Carousel />
          </section>
          <section className="mt-10">
            {favorites.data ? (
              <div className="flex h-4/5 flex-col items-center justify-center">
                <h2 className="mb-4 text-2xl font-semibold">
                  Favorited Degrees
                </h2>
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
      </div>
      {/*<Footer />*/}
    </>
  );
};

export default Home;
