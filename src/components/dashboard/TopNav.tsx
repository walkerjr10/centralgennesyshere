import { motion } from "framer-motion";
import { User, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const menuItems = [
  { label: "Dashboard", href: "/" },
  { label: "Empresas", href: "/empresas" },
  { label: "Cursos", href: "/cursos" },
  { label: "Amistosos", href: "/amistosos" },
  { label: "Settings", href: "/settings" },
  { label: "Usuários", href: "/usuarios" },
];

export function TopNav() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/login");
    }
  };

  const handleMenuClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (href === "/") {
      navigate(href);
    } else {
      toast({
        description: "Esta funcionalidade será implementada em breve.",
        duration: 2000,
      });
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50"
    >
      <div className="flex items-center gap-x-4">
        <span className="font-semibold text-2xl text-[#4263EB]">Gennesys</span>
      </div>
      
      <div className="flex items-center gap-x-6">
        <nav className="hidden md:flex items-center gap-x-6">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleMenuClick(item.href)}
              className="text-sm text-gray-600 hover:text-[#4263EB] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-100">
                  <User className="h-4 w-4 text-gray-600" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}