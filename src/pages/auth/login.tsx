import { GetServerSideProps, NextPage, InferGetServerSidePropsType } from "next";
import { getProviders } from "next-auth/react";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

import LoginForm from "../../components/LoginForm";
import { ProviderProps } from 'next-auth';

interface ILoginPage {
  providerResults: ProviderProps[]
}

const Login: NextPage<ILoginPage> = ({ providerResults }) => {
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
  const providersRes = getProviders(); // Get OAUTH providers
  const sessionRes = getServerAuthSession(context); // Get Session

  // Resolve all promises (async request were done in parallel)
  const[providersData, sessionData] = await Promise.all([providersRes, sessionRes]);

  // Redirect to home page if we are already logged in
  if(sessionData) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  // For each provider, create a ProviderProp object with the name and id.
  const providers = Object.values(providersData!).map((provider) => ({
    name: provider.name, 
    id: provider.id as string} as ProviderProps))

  return {
    props: { providerResults: providers }
  };
}

