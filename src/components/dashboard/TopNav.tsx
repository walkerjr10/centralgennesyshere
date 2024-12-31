import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface TopNavProps {
  onSectionChange: (section: string) => void;
  isAdmin?: boolean;
}

export const TopNav = ({ onSectionChange, isAdmin }: TopNavProps) => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    onSectionChange(section);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSectionChange("dashboard")}
              className={`inline-flex items-center px-4 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out border-b-2 focus:outline-none ${
                activeSection === "dashboard"
                  ? "border-[#4263EB] text-[#4263EB]"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Dashboard
            </motion.button>

            {isAdmin && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSectionChange("users")}
                className={`inline-flex items-center px-4 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out border-b-2 focus:outline-none ${
                  activeSection === "users"
                    ? "border-[#4263EB] text-[#4263EB]"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Usuários
              </motion.button>
            )}
          </div>

          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignOut}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#4263EB] transition-colors duration-150 ease-in-out"
            >
              Sair
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};