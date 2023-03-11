import { type NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import { trpc } from "../../../utils/trpc";
import DegreeNavbar from "../../../components/navigation/DegreeNavbar";
import Footer from "../../../components/Footer";

const DegreeHome: NextPage = () => {
  const router = useRouter();
  const { degree } = router.query;

  // Dependent query, will not run unless degree is defined
  // Push to 404 if degree cannot be found.
  const degreeQuery = trpc.forum.getDegreeInfo.useQuery(
    { degreeId: degree as string },
    {
      enabled: typeof degree !== "undefined",
      retry: (failureCount, error) => {
        if (error.message === "NOT_FOUND") {
          router.push("/404");
          return false;
        }

        if (failureCount + 1 < 4) {
          router.push("/500");
          return false;
        }
        return true;
      },
    }
  );

  return (
    <>
      <Head>
        <title>Degree Door Degree Home</title>
        <meta name="description" content="Degree Index Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="min-w-screen relative min-h-screen bg-gradient-to-r 
      from-rose-400 via-fuchsia-500 to-indigo-500 pb-footer-fit"
      >
        {degreeQuery.isSuccess && (
          <>
            <DegreeNavbar
              active="overview"
              degreeName={degreeQuery.data.name}
              degreeId={degreeQuery.data.id}
            />
            <main className="p-8">
              <div
                className="relative mx-auto mt-8 h-80 w-2/3 rounded-xl 
            border bg-gradient-to-b from-rose-100 to-teal-100 shadow-2xl"
              >
                <section className="absolute inset-0 flex flex-col justify-center gap-2 text-center">
                  <h1 className="text-4xl font-bold md:text-6xl">
                    {degreeQuery.data.name}
                  </h1>
                  <p className="text-lg md:text-xl">
                    Apart of the College of Engineering at Wayne State
                    University
                  </p>
                </section>
              </div>
              <section className="mt-8">
                <h1 className="text-center text-xl font-bold text-white">
                  More Info...
                </h1>
                <div className="mt-8 flex flex-col items-center justify-center gap-16 align-middle md:flex-row">
                  <article className="h-80 w-80 rounded-xl border bg-gradient-to-b from-rose-100 to-teal-100 p-4 shadow-2xl">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-center font-bold">
                        Information about the University
                      </h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolore quasi suscipit voluptatem natus! Eum, deleniti
                        fugit. Illo veniam laborum distinctio placeat fugiat
                        temporibus molestiae, quis voluptates soluta debitis
                        cupiditate neque!
                      </p>
                    </div>
                  </article>
                  <article className="h-80 w-80 rounded-xl border bg-gradient-to-b from-rose-100 to-teal-100 p-4 shadow-2xl">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-center font-bold">
                        Information about the University
                      </h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolore quasi suscipit voluptatem natus! Eum, deleniti
                        fugit. Illo veniam laborum distinctio placeat fugiat
                        temporibus molestiae, quis voluptates soluta debitis
                        cupiditate neque!
                      </p>
                    </div>
                  </article>
                  <article className="h-80 w-80 rounded-xl border bg-gradient-to-b from-rose-100 to-teal-100 p-4 shadow-2xl">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-center font-bold">
                        Information about the University
                      </h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolore quasi suscipit voluptatem natus! Eum, deleniti
                        fugit. Illo veniam laborum distinctio placeat fugiat
                        temporibus molestiae, quis voluptates soluta debitis
                        cupiditate neque!
                      </p>
                    </div>
                  </article>
                </div>
              </section>
            </main>
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default DegreeHome;
