import { motion } from "framer-motion";
import { GetServerSideProps, NextPage, InferGetServerSidePropsType } from "next";
import { getProviders } from "next-auth/react";
import { unstable_getServerSession } from 'next-auth';

import LoginForm from "../../../components/LoginForm";

const Login: NextPage = ({ providers } : InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-green-600 bg-gradient-to-r from-green-400 to-green-800 flex items-center justify-center h-screen flex-col"
    >
      <LoginForm />
    </motion.div>
  )
}

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => { 
  const providers = await getProviders();
  const session = await unstable_getServerSession();

  if(session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: { providers }
  };
}

