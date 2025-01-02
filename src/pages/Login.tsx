import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginFeatures } from "@/components/auth/login/LoginFeatures";
import { LoginFooter } from "@/components/auth/login/LoginFooter";
import { LoginHeader } from "@/components/auth/login/LoginHeader";

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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed left-0 top-0 bottom-0 w-1/2 text-white flex flex-col justify-between p-8"
        style={{
          background: `linear-gradient(
            to right,
            rgba(66, 99, 235, 0.75),
            rgba(66, 99, 235, 0.65)
          ), url('/lovable-uploads/9ac1479b-a9c7-4e54-ad45-6ef16f320548.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'soft-light'
        }}
      >
        <LoginHeader />
        <LoginFeatures />
        <LoginFooter />
      </motion.div>

      <div className="w-full flex items-center justify-center ml-[50%]">
        <div className="w-full max-w-md px-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;