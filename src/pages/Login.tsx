import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { AuthFeature } from "@/components/auth/AuthFeature";
import { LoginForm } from "@/components/auth/LoginForm";
import { DocumentIcon, TeamIcon, ChartIcon } from "@/components/auth/AuthIcons";
import { CopyrightIcon, ShieldCheckIcon } from "lucide-react";

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
    <div className="flex min-h-screen w-full">
      <div 
        className="fixed left-0 top-0 bottom-0 w-1/2 text-white flex flex-col justify-between p-8"
        style={{
          background: `linear-gradient(
            to right,
            rgba(66, 99, 235, 0.9),
            rgba(66, 99, 235, 0.85)
          ), url('/lovable-uploads/9ac1479b-a9c7-4e54-ad45-6ef16f320548.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply'
        }}
      >
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
              Gerencia suas empresas de forma inteligente e eficiente com a AI Gennesys
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
            <AuthFeature
              icon={<ShieldCheckIcon className="w-6 h-6" />}
              title="Segurança Avançada"
              description="Proteção total dos seus dados empresariais"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center text-sm opacity-80"
        >
          <CopyrightIcon className="w-4 h-4 mr-2" />
          <span>Todos os direitos reservados à Gennesys 2025</span>
        </motion.div>
      </div>

      <div className="w-full flex items-center justify-center ml-[50%]">
        <div className="w-full max-w-md px-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;