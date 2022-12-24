import { SiDiscord } from 'react-icons/si';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { ProviderProps } from 'next-auth';

interface ILoginForm {
  providers: ProviderProps[];
}

const LoginForm:React.FC<ILoginForm> = ({ providers }) => {
  const discord = providers[0];

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md rounded p-8 items-center flex flex-col gap-4"
    >
      <h2 className="text-center text-2xl font-bold tracking text-gray-900">Welcome to Degree Door</h2>
      <div key={discord!.name}>
        <button className="p-4 py-2 text-md text-indigo-500 font-semibold rounded-full border
          border-indigo-500 hover:bg-indigo-500 hover:text-gray-50 hover:border-transparent 
          duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center gap-4"
          onClick={() => signIn(discord!.id)}
          type="button"
        >
          <SiDiscord />
          <p>Continue with Discord</p>
        </button>
      </div>
    </motion.form>
  );
}

export default LoginForm;
