import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, stagger } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, LoginIcon } from "./AuthIcons";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Login realizado com sucesso!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="w-full max-w-md space-y-8"
    >
      {isMobile && (
        <motion.div 
          variants={logoVariants}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-[#4263EB] mb-1">
            Central Gennesys
          </h1>
          <p className="text-sm text-gray-600">
            Versão Mobile
          </p>
        </motion.div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <motion.div variants={itemVariants} className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <motion.div
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4263EB]/20 transition-all"
              required
            />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <motion.div
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4263EB]/20 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-[#4263EB] focus:ring-[#4263EB]"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Lembrar-me
            </label>
          </div>
          <a href="#" className="text-sm text-[#4263EB] hover:underline">
            Esqueceu a senha?
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          initial="rest"
          animate="rest"
        >
          <Button 
            className="w-full bg-[#4263EB] hover:bg-[#4263EB]/90 text-white flex items-center justify-center gap-2"
            disabled={loading}
          >
            <span>{loading ? "Entrando..." : "Entrar"}</span>
            <LoginIcon />
          </Button>
        </motion.div>

        <motion.p variants={itemVariants} className="text-center text-sm text-gray-600">
          Não tem uma conta?{" "}
          <a href="#" className="text-[#4263EB] hover:underline">
            Criar conta
          </a>
        </motion.p>
      </form>
    </motion.div>
  );
};