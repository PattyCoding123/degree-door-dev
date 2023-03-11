import { type NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>Degree Door About Page</title>
        <meta name="description" content="The Degree Door About page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="min-w-screen relative min-h-screen bg-gradient-to-r
       from-rose-400 via-fuchsia-500 to-indigo-500 pb-footer-fit"
      >
        <Footer />
      </div>
    </>
  );
};

export default About;
