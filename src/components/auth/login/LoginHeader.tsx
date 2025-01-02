import { motion } from "framer-motion";

export const LoginHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-12 h-12 mb-12">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 12V14H16V12H8ZM8 16V18H13V16H8Z"/>
        </svg>
      </div>
      <h1 className="text-5xl font-bold mb-6">
        Bem-vindo à<br />Gennesys
      </h1>
      <p className="text-xl opacity-90 mb-12">
        Gerencia suas empresas de forma inteligente e eficiente com a AI Gennesys
      </p>
    </motion.div>
  );
};