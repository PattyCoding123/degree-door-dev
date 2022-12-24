import { motion } from "framer-motion";
import { type NextPage } from "next";
import LoginForm from "../components/LoginForm";

const Login: NextPage = () => {
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
