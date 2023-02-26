import type { GetServerSideProps, NextPage } from "next";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Head from "next/head";

import { trpc } from "../../utils/trpc";
import HomeNavbar from "../../components/navigation/HomeNavbar";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Degree Door Profile</title>
        <meta name="description" content="The Degree Door profile page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen overflow-y-auto bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
        <HomeNavbar />
        <main className="p-8">
          <section
            className="mx-auto flex w-1/2 flex-col items-center justify-center
          rounded-md bg-gradient-to-b from-rose-100 to-teal-100 p-8"
          >
            <div className="flex flex-col items-center justify-center">
              <Image
                className="mb-3 rounded-full shadow-lg"
                src="/avatar.png"
                alt="profile avatar"
                width={96}
                height={96}
              />
              <h1 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                First Name Last Name
              </h1>
            </div>
            <div className="mt-8 h-full w-full p-4">
              <form className="mx-auto grid grid-cols-2 rounded-lg border border-gray-300 bg-white p-8 shadow-2xl">
                <div className="col-span-2 mb-4 grid h-full w-full grid-cols-2">
                  <div className="col-span-1 px-4">
                    <label className="font-bold text-gray-900" htmlFor="name">
                      Display Name
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value="displayName"
                      id="displayName"
                      className="mt-2 w-full rounded-lg border border-gray-400 bg-slate-50 p-2 text-gray-900 outline-none
                    duration-300 hover:shadow-2xl"
                    />
                  </div>
                  <div className="col-span-1 px-4">
                    <label className="font-bold text-gray-900" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="text"
                      name="email"
                      value="email"
                      id="email"
                      className="mt-2 w-full rounded-lg border border-gray-400 bg-slate-50 p-2 text-gray-900 outline-none
                    duration-300 hover:shadow-2xl"
                    />
                  </div>
                </div>
                <div className="col-span-1 mb-4 px-4">
                  <label htmlFor="status" className="font-bold text-gray-900">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="mt-2 w-full rounded-lg border border-gray-400 bg-slate-50 p-2 text-gray-900 outline-none
                  duration-300 hover:shadow-2xl"
                  >
                    <option value="Upcoming Student">Upcoming Student</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Professor">Professor</option>
                  </select>
                </div>
                <div className="col-span-2 px-4">
                  <label htmlFor="about" className="font-bold text-gray-900">
                    About Me
                  </label>
                  <textarea
                    name="about"
                    value="about"
                    id="about"
                    className="mt-2 h-40 w-full resize-none rounded-lg 
                  border border-gray-400 bg-slate-50 p-2 text-gray-900 outline-none duration-300 hover:shadow-2xl"
                  />
                </div>
              </form>
            </div>
          </section>
          <AuthShowcase />
        </main>
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
  const sessionData = await getServerAuthSession(context); // Get Session
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
  if (!sessionData || sessionData.user?.id !== userId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
