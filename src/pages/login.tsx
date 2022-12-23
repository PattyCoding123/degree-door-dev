import { motion } from "framer-motion";
import { type NextPage } from "next";

const Login: NextPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-green-600 bg-gradient-to-r from-green-400 to-green-800 flex items-center justify-center h-screen"
    >
      <button
        className="px-4 py-2 bg-white rounded-full shadow-lg font-bold hover:opacity-80 hover:scale-90 duration-300"
      >
        Log in with Discord
      </button>
    </motion.div>
  )
}

export default Login;
