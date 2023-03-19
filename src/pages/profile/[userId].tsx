import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";

import { trpc } from "../../utils/trpc";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { useDeleteUser } from "../../utils/custom-hooks";
import Layout from "../../components/layouts/Layout";
import ProfileDisplay from "../../components/forms/ProfileDisplay";
import ProfileLoadingIndicator from "../../components/loading-ui/ProfileLoadingIndicator";
import ConfirmationDialog from "../../components/modals/dialogs/ConfirmationDialog";

// Profile page will render the user's profile information and also will allow users
// to open a form that will allow them to change their profile information.
const Profile: NextPage = () => {
  const router = useRouter();

  // ! Use trpc getSession procedure to refresh the session. It doesn't
  // ! pull directly from DB since it uses NextAuth getServerSession.
  const {
    data: session,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = trpc.auth.getSession.useQuery();

  // Format user displayable data into an object.
  const userProfile = {
    displayName: session?.user?.name,
    email: session?.user?.email,
    status: session?.user?.status,
    about: session?.user?.about,
  };

  if (isError) {
    return (
      <Layout
        title="Degree Door Profile"
        description="The Degree Door Profile Page"
      >
        <Toaster />
        <main className="flex flex-1 items-center p-8">
          <div
            className="relative mx-auto flex h-96 w-1/2 flex-col items-center
        justify-center rounded-md bg-gray-200 p-8"
          >
            <h1 className="absolute top-8 text-3xl font-bold text-gray-900 dark:text-white">
              Error
            </h1>
            <p className="text-xl">
              There was a problem accessing your profile information
            </p>
            <button className="text-lg underline" onClick={() => refetch()}>
              Try again...
            </button>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout
      title="Degree Door Profile"
      description="The Degree Door Profile Page"
    >
      <Toaster /> {/* Render toast notifications */}
      <main className="p-8">
        <div
          className="mx-auto flex w-1/2 flex-col items-center justify-center
          rounded-md bg-gray-200 p-8"
        >
          <div
            className={clsx(
              "flex flex-col items-center justify-center",
              (isLoading || isFetching) && "animate-pulse"
            )}
          >
            {/* Render the user's avatar image */}
            <Image
              className="mb-3 rounded-full shadow-lg"
              src={
                session?.user?.image ? `${session.user?.image}` : "/avatar.png"
              }
              alt="profile avatar"
              width={96}
              height={96}
              priority={true}
            />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Profile Information
            </h1>
          </div>
          {isLoading || isFetching ? (
            <ProfileLoadingIndicator />
          ) : (
            <ProfileDisplay
              userProfile={userProfile}
              isEditable={
                typeof router.query.userId === "string" &&
                session?.user?.id === router.query.userId
              }
            />
          )}
        </div>
        <AuthShowcase />
      </main>
    </Layout>
  );
};

const AuthShowcase: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const { data: sessionData } = useSession();

  const deleteUser = useDeleteUser();

  return (
    <>
      <ConfirmationDialog
        show={showDialog}
        header={"Delete your Account"}
        content={
          "If you delete your account, you can no longer access and delete your old reviews."
        }
        okBtnText={"Delete"}
        handleOk={() => {
          deleteUser.mutate();
        }}
        handleCancel={() => setShowDialog(false)}
      />
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-white">
          {sessionData && <span>Logged in as {sessionData.user?.name} -</span>}
          <span className="font-bold"> DANGER ZONE </span>
        </p>
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => setShowDialog(true)}
        >
          Delete My Account
        </button>
      </div>
    </>
  );
};

export default Profile;

// The use of getServerSideProps in the profile page is to make sure
// the user is actually logged in and accessing their profile page.
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
    props: {},
  };
};
