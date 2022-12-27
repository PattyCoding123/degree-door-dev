import { GetServerSideProps, type NextPage } from "next";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import LoginForm from "../../components/LoginForm";

const Login: NextPage = () => {
  return (
    <main
      className="bg-green-600 bg-gradient-to-r from-green-400 to-green-800 flex items-center justify-center h-screen flex-col"
    >
      <LoginForm />
    </main>
  )
}

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => { 
  const sessionData = await getServerAuthSession(context); // Get Session

  // Redirect to home page if we are already logged in
  if(sessionData) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  };
}

