import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

const menuItems = [
  { label: "Dashboard", href: "/" },
  { label: "Empresas", href: "/empresas" },
  { label: "Cursos", href: "/cursos" },
  { label: "Amistosos", href: "/amistosos" },
  { label: "Settings", href: "/settings" },
  { label: "Usuários", href: "/usuarios" },
];

export function TopNav() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b px-4 py-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-x-4">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
        <span className="font-semibold text-xl">Gennesys</span>
      </div>
      <nav className="hidden md:flex items-center gap-x-4">
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </motion.div>
  );
}