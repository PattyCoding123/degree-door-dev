import type { GetServerSideProps, NextPage } from "next";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import LoginForm from "../../components/forms/LoginForm";
import Layout from "../../components/layouts/Layout";

const Login: NextPage = () => {
  // * Check LoginForm for documentation regarding the NextAuth signIn function
  // * and how the callbackUrl is passed inside.
  return (
    <Layout title="Degree Door login page" description="Degree Door login page">
      <main
        className="flex flex-1 flex-col items-center justify-center 
      "
      >
        <LoginForm />
      </main>
    </Layout>
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
