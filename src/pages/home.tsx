import { type NextPage } from "next";

import HeroBanner from "../components/HeroBanner";

const Home: NextPage = () => {
  return (
    <main className="bg-gradient-to-b from-[#00076f] to-[#44008b] text-white h-screen w-screen">
      <HeroBanner />
      <section className="max-w-md rounded-lg shadow-xl p-6 mx-auto">
        <p className="text-tokyo-night">Hello, this is my home page.</p>
      </section>
    </main>
  );

}

export default Home;