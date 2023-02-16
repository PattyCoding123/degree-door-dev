import type { GetServerSideProps, NextPage } from "next";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import LoginForm from "../../components/forms/LoginForm";

const Login: NextPage = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
      <LoginForm />
    </main>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionData = await getServerAuthSession(context); // Get Session

  // Redirect to home page if we are already logged in
  if (sessionData) {
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
