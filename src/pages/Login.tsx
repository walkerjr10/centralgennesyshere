import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { AuthFeature } from "@/components/auth/AuthFeature";
import { LoginForm } from "@/components/auth/LoginForm";
import { DocumentIcon, TeamIcon, ChartIcon } from "@/components/auth/AuthIcons";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
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

          <div className="space-y-8">
            <AuthFeature
              icon={<DocumentIcon />}
              title="Gestão Centralizada"
              description="Todas as suas empresas em um só lugar"
            />
            <AuthFeature
              icon={<TeamIcon />}
              title="Colaboração em Equipe"
              description="Trabalhe em conjunto com sua equipe"
            />
            <AuthFeature
              icon={<ChartIcon />}
              title="Análises Avançadas"
              description="Insights e relatórios detalhados"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#" className="inline-flex items-center text-white hover:opacity-80 transition-opacity">
            <span className="mr-2">Acesse nossa documentação completa</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 8L21 12M21 12L17 16M21 12H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;