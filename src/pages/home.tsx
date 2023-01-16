import { type NextPage } from "next";

import HeroBanner from "../components/HeroBanner";
import HomeNavbar from "../components/HomeNavbar";
import Searchbar from "../components/Searchbar";

const Home: NextPage = () => {
  return (
    <div className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-white h-screen w-screen">
      <HomeNavbar>
        <Searchbar />
      </HomeNavbar>
      <main>
        <HeroBanner />
        <section className="max-w-md rounded-lg shadow-xl p-6 mx-auto">
          <p className="text-tokyo-night">Hello, this is my home page.</p>
        </section>
      </main>
    </div>
    
  );

}

export default Home;