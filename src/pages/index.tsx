import { type NextPage } from "next";

import HeroBanner from "../components/HeroBanner";
import Carousel from "../components/containers/Carousel";
import Layout from "../components/layouts/Layout";
import FavoritesDisplay from "../components/containers/FavoritesDisplay";

// The Home page will render the HeroBanner, degree Carousel, and all favorite
// degrees of a user IF they are logged in and have favorite degrees.
const Home: NextPage = () => {
  return (
    <Layout title="Degree Door" description="The Degree Door home page">
      <main className="flex-1 text-white">
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
