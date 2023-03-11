import type { GetServerSideProps, NextPage } from "next";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Head from "next/head";

import { trpc } from "../../utils/trpc";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import HomeNavbar from "../../components/navigation/HomeNavbar";
import Footer from "../../components/Footer";
import ProfileDisplay from "../../components/forms/ProfileDisplay";

const Profile: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Degree Door Profile</title>
        <meta name="description" content="The Degree Door profile page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeNavbar />
      <div
        className="min-w-screen relative min-h-screen
        bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 pb-footer-fit-small md:pb-footer-fit"
      >
        <main className="p-8">
          <section
            className="mx-auto flex w-1/2 flex-col items-center justify-center
          rounded-md bg-gradient-to-b from-rose-100 to-teal-100 p-8"
          >
            <div className="flex flex-col items-center justify-center">
              <Image
                className="mb-3 rounded-full shadow-lg"
                src={
                  sessionData?.user?.image
                    ? `${sessionData.user?.image}`
                    : "/avatar.png"
                }
                alt="profile avatar"
                width={96}
                height={96}
                priority={true}
              />
              <h1 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                First Name Last Name
              </h1>
            </div>
            <ProfileDisplay
              displayName={sessionData?.user?.name}
              email={sessionData?.user?.email}
            />
          </section>
          <AuthShowcase />
        </main>
        <Footer />
      </div>
    </>
  );
};

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context); // Get Session
  const { userId } = context.query;

  if (typeof userId !== "string") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Redirect to home page if session doesn't exist
  if (!session || session.user?.id !== userId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
