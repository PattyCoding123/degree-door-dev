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
      <div className="h-screen w-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-white">
        <HomeNavbar />
        <main>
          <HeroBanner />
          <section>
            <Carousel />
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
