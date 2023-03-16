import { type NextPage } from "next";

import HeroBanner from "../components/HeroBanner";
import Carousel from "../components/Carousel";
import Layout from "../components/layouts/Layout";
import FavoritesDisplay from "../components/FavoritesDisplay";

// The Home page will render the HeroBanner, degree Carousel, and all favorite
// degrees of a user IF they are logged in and have favorite degrees.
const Home: NextPage = () => {
  return (
    <Layout title="Degree Door" description="The Degree Door home page">
      <main className="text-white">
        <HeroBanner />
        <section>
          <Carousel />
        </section>
        <section className="mt-10 flex justify-center">
          <FavoritesDisplay />
        </section>
      </main>
    </Layout>
  );
};

export default Home;
