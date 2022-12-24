import { GetServerSideProps, NextPage, InferGetServerSidePropsType } from "next";
import { getProviders } from "next-auth/react";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

import LoginForm from "../../components/LoginForm";

const Login: NextPage = ({ providerResults } : InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main
      className="bg-green-600 bg-gradient-to-r from-green-400 to-green-800 flex items-center justify-center h-screen flex-col"
    >
      <LoginForm providers={providerResults}/>
    </main>
  )
}

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => { 
  const providers = await getProviders();
  const session = await getServerAuthSession(context);

  if(session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: { providerResults: providers }
  };
}

