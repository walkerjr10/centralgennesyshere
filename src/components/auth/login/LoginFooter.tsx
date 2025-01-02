import { motion } from "framer-motion";
import { CopyrightIcon } from "lucide-react";

export const LoginFooter = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex items-center justify-center text-sm opacity-80"
    >
      <CopyrightIcon className="w-4 h-4 mr-2" />
      <span>Todos os direitos reservados à Gennesys 2025</span>
    </motion.div>
  );
};