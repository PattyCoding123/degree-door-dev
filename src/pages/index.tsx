import { type NextPage } from "next";
import Head from "next/head";

import HeroBanner from "../components/HeroBanner";
import HomeNavbar from "../components/navigation/HomeNavbar";
import Carousel from "../components/Carousel";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Degree Door</title>
        <meta name="description" content="The Degree Door home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen w-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-white">
        <HomeNavbar />
        <main>
          <HeroBanner />
          <section>
            <Carousel />
          </section>
          <section className="mt-10">
            <div className="flex h-4/5 flex-col items-center justify-center">
              <h2 className="mb-4 text-2xl font-semibold">Favorited Degrees</h2>
              <div className="flex h-full w-full items-center justify-center gap-4">
                {/* {favDegrees && favDegrees.map((degree, index) => (
              <FavoriteDegree key={index} degree={degree} user={userID} />
            ))} */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
