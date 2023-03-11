import { type NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import HomeNavbar from "../components/navigation/HomeNavbar";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>Degree Door About Page</title>
        <meta name="description" content="The Degree Door About page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeNavbar />
      {/* In About Page content div, use flex to center
      the about description. */}
      <div
        className="min-w-screen relative flex min-h-screen flex-col
        items-center justify-center bg-gradient-to-r from-rose-400
       via-fuchsia-500 to-indigo-500 pb-footer-fit"
      >
        <main>
          <div
            className="mx-auto flex h-fit w-3/5 flex-col gap-4 rounded-lg 
            bg-gradient-to-b from-rose-100 to-teal-100 p-8"
          >
            <h1 className="text-center text-5xl font-bold">Degree Door</h1>
            <p className="text-lg">
              We are a group of college students looking to innovate the way
              information flows about universities and the degree pathways they
              offer. We have developed this website in order to help future
              students discover the pathway they want to embark on in their
              university journey. By incorporating a fullstack mentality were
              able to develop this web application that functions in a forum
              like setting. These forums will provide basic information on the
              subject, as well as reviews and answered questions by current
              students. Users will be able to register an account to access the
              main functionalities of the website. From there they are able to
              access everything Degree Door has to offer! We thank you for using
              our product and hope you find it as useful as we intended it to
              be!
              <br />
              <span className="font-semibold">
                Sincerely, <br />
                Degree Door Team
              </span>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;