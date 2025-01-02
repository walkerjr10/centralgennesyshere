import { motion } from "framer-motion";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  showButton?: boolean;
}

export const DashboardHeader = ({ title, subtitle, showButton = true }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-[#4263EB]">{title}</h1>
        <p className="text-gray-600 mt-2">{subtitle}</p>
      </motion.div>
      
      {showButton && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button className="bg-[#4263EB] hover:bg-[#4263EB]/90 text-white font-medium px-6 py-2 rounded-md transition-colors">
              Gerar Relatório
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};