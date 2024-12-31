import { motion } from "framer-motion";

interface NavItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const NavItem = ({ label, isActive, onClick }: NavItemProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`inline-flex items-center px-4 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out border-b-2 focus:outline-none ${
        isActive
          ? "border-[#4263EB] text-[#4263EB]"
          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
      }`}
    >
      {label}
    </motion.button>
  );
};