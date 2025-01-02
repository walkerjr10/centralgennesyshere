import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: LucideIcon;
}

export const NavItem = ({ label, isActive, onClick, icon: Icon }: NavItemProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out border-b-2 focus:outline-none ${
        isActive
          ? "border-[#4263EB] text-[#4263EB]"
          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
      }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </motion.button>
  );
};