import { type NextPage } from "next";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Head from "next/head";

import { trpc } from "../../../utils/trpc";
import ForumForm from "../../../components/forms/ForumForm";
import DegreeNavbar from "../../../components/navigation/DegreeNavbar";
import Footer from "../../../components/Footer";

const Write: NextPage = () => {
  const router = useRouter();
  const { degree } = router.query;

  // Dependent query, will not run unless degree is defined
  // Push to /404 if page cannot be found.
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
        <title>Degree Door Post Creation</title>
        <meta name="description" content="Degree write page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="min-w-screen relative min-h-screen bg-gradient-to-r
        from-rose-400 via-fuchsia-500 to-indigo-500 pb-footer-fit"
      >
        {degreeQuery.isSuccess && (
          <>
            <Toaster />
            <DegreeNavbar
              active="write"
              degreeName={degreeQuery.data.name}
              degreeId={degreeQuery.data.id}
            />
            <main>
              <section>
                <h1 className="p-8 text-center text-4xl text-white">
                  Write your Review
                </h1>
                <ForumForm degreeId={degreeQuery.data.id} />
              </section>
            </main>
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Write;
