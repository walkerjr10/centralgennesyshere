import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Settings, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-2 text-gray-700 hover:text-[#4263EB] transition-colors duration-150 ease-in-out rounded-full hover:bg-gray-100"
                >
                  <User className="h-5 w-5" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white">
                <DropdownMenuItem 
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() => navigate("/settings")}
                >
                  <Settings className="h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer flex items-center gap-2 text-red-600 focus:text-red-600" 
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};