import { SiDiscord } from "react-icons/si";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { callbackUrl } = router.query;

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-4 rounded bg-white p-8 shadow-md"
    >
      <h2 className="tracking text-center text-2xl font-bold text-gray-900">
        Welcome to Degree Door
      </h2>
      {typeof callbackUrl === "string" && (
        <div>
          <button
            className="text-md flex items-center gap-4 rounded-full border border-indigo-500
            p-4 py-2 font-semibold text-indigo-500 duration-150 hover:border-transparent 
            hover:bg-indigo-500 hover:text-gray-50"
            onClick={() => signIn("discord", { callbackUrl: callbackUrl })}
            type="button"
          >
            <SiDiscord />
            <p>Continue with Discord</p>
          </button>
        </div>
      )}
    </motion.form>
  );
};

export default LoginForm;
