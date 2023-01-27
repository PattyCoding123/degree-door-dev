import { type NextPage } from "next";

import HeroBanner from "../components/HeroBanner";
import HomeNavbar from "../components/HomeNavbar";
import Carousel from "../components/Carousel";

const Home: NextPage = () => {
  return (
    <div className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-white h-screen w-screen">
      <HomeNavbar />
      <main>
        <HeroBanner />
        <section>
          <Carousel />
        </section>
      </main>
    </div>
  );
}

export default Home;