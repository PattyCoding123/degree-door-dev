import { type NextPage } from "next";

import Layout from "../components/layouts/Layout";

// About page will render the mission statement of the Degree Door team.
const About: NextPage = () => {
  return (
    <Layout
      title="Degree Door About Page"
      description="The Degree Door about page"
    >
      <main className="relative flex h-full w-full flex-1 flex-col">
        <div
          className="my-auto flex h-fit w-3/5 flex-col gap-4 self-center rounded-lg 
            bg-primary p-8"
        >
          <h1 className="text-center text-5xl font-bold">Degree Door</h1>
          <p className="text-lg">
            We are a group of college students looking to innovate the way
            information flows about universities and the degree pathways they
            offer. We have developed this website in order to help future
            students discover the pathway they want to embark on in their
            university journey. By incorporating a fullstack mentality were able
            to develop this web application that functions in a forum like
            setting. These forums will provide basic information on the subject,
            as well as reviews and answered questions by current students. Users
            will be able to register an account to access the main
            functionalities of the website. From there they are able to access
            everything Degree Door has to offer! We thank you for using our
            product and hope you find it as useful as we intended it to be! IF
            you have any suggestions, click the GitHub link or icon in the
            footer and go to the <b>Issues</b> tab and click on the
            <span className="font-bold text-green-700"> New issue</span> button
            to open a new issue for any suggestions.
            <br />
            <span className="font-semibold">
              Sincerely, <br />
              Degree Door Team
            </span>
          </p>
        </div>
      </main>
    </Layout>
  );
};

export default About;
