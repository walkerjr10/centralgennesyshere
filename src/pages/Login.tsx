import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left side - Blue background with content */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#4263EB] text-white p-12 flex-col justify-between">
        <div>
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
              Gerencie suas empresas de forma inteligente e eficiente
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <Feature
              icon={<DocumentIcon />}
              title="Gestão Centralizada"
              description="Todas as suas empresas em um só lugar"
            />
            <Feature
              icon={<TeamIcon />}
              title="Colaboração em Equipe"
              description="Trabalhe em conjunto com sua equipe"
            />
            <Feature
              icon={<ChartIcon />}
              title="Análises Avançadas"
              description="Insights e relatórios detalhados"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#" className="inline-flex items-center text-white hover:opacity-80 transition-opacity">
            <span className="mr-2">Acesse nossa documentação completa</span>
            <ArrowIcon />
          </a>
        </motion.div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
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
            </div>

            <Button className="w-full bg-[#4263EB] hover:bg-[#4263EB]/90 text-white flex items-center justify-center gap-2">
              <span>Entrar</span>
              <LoginIcon />
            </Button>

            <p className="text-center text-sm text-gray-600">
              Não tem uma conta?{" "}
              <a href="#" className="text-[#4263EB] hover:underline">
                Criar conta
              </a>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

// Icon Components
const DocumentIcon = () => (
  <div className="w-10 h-10 bg-white/20 rounded-lg p-2.5">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 12V14H16V12H8ZM8 16V18H13V16H8Z"/>
    </svg>
  </div>
);

const TeamIcon = () => (
  <div className="w-10 h-10 bg-white/20 rounded-lg p-2.5">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12.75C8.83 12.75 6.25 15.33 6.25 18.5C6.25 19.19 6.81 19.75 7.5 19.75H16.5C17.19 19.75 17.75 19.19 17.75 18.5C17.75 15.33 15.17 12.75 12 12.75ZM12 4.25C10.205 4.25 8.75 5.705 8.75 7.5C8.75 9.295 10.205 10.75 12 10.75C13.795 10.75 15.25 9.295 15.25 7.5C15.25 5.705 13.795 4.25 12 4.25Z"/>
    </svg>
  </div>
);

const ChartIcon = () => (
  <div className="w-10 h-10 bg-white/20 rounded-lg p-2.5">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 21V3C5 2.44772 4.55228 2 4 2C3.44772 2 3 2.44772 3 3V21C3 21.5523 3.44772 22 4 22H21C21.5523 22 22 21.5523 22 21C22 20.4477 21.5523 20 21 20H5ZM20 10C20 9.44772 19.5523 9 19 9C18.4477 9 18 9.44772 18 10V16C18 16.5523 18.4477 17 19 17C19.5523 17 20 16.5523 20 16V10ZM14 13C14 12.4477 13.5523 12 13 12C12.4477 12 12 12.4477 12 13V16C12 16.5523 12.4477 17 13 17C13.5523 17 14 16.5523 14 16V13ZM8 15C8 14.4477 7.55228 14 7 14C6.44772 14 6 14.4477 6 15V16C6 16.5523 6.44772 17 7 17C7.55228 17 8 16.5523 8 16V15Z"/>
    </svg>
  </div>
);

const ArrowIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M17 8L21 12M21 12L17 16M21 12H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const LoginIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
  </svg>
);

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex items-start space-x-4">
    {icon}
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  </div>
);

export default Login;