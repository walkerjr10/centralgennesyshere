import { useEffect, useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { CompanyTypeCard } from "@/components/dashboard/CompanyTypeCard";
import { TopNav } from "@/components/dashboard/TopNav";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Lazy load the UsersSection to improve initial load time
const UsersSection = lazy(() => import("@/components/dashboard/UsersSection"));

const companyTypes = [
  { type: "Holding", count: 8 },
  { type: "Family Office", count: 5 },
  { type: "Corporate", count: 12 },
  { type: "Agro", count: 6 },
  { type: "Industrial", count: 10 },
  { type: "Retail", count: 7 },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

const Index = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  // Use React Query for session management
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
    retry: false
  });

  // Fetch user profile to get role
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session?.user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id
  });

  useEffect(() => {
    if (!sessionLoading && !session) {
      navigate("/login");
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, session, sessionLoading]);

  // Reset to dashboard if user is not admin and tries to access users section
  useEffect(() => {
    if (profile && profile.role !== 'admin' && activeSection === 'users') {
      setActiveSection('dashboard');
    }
  }, [profile, activeSection]);

  if (sessionLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-[#4263EB]">Loading...</div>
      </div>
    );
  }

  const isAdmin = profile?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav onSectionChange={setActiveSection} isAdmin={isAdmin} />
      
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-[#4263EB]">Loading section...</div>
          </div>
        }>
          {activeSection === "users" && isAdmin ? (
            <UsersSection />
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl font-bold text-[#4263EB]">Visão Geral</h1>
                  <p className="text-gray-600 mt-2">Análise consolidada - dezembro</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button className="bg-[#4263EB] hover:bg-[#4263EB]/90 text-white font-medium px-6 py-2 rounded-md transition-colors">
                      Gerar Relatório
                    </button>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
              >
                <motion.div variants={item}>
                  <StatsCard
                    title="Empresas Ativas"
                    value="48"
                    change={{ value: "+12%", positive: true }}
                    icon={Building2}
                  />
                </motion.div>
                <motion.div variants={item}>
                  <StatsCard
                    title="Receita Total"
                    value="R$ 12,50 mi"
                    change={{ value: "+15%", positive: true }}
                    icon={TrendingUp}
                  />
                </motion.div>
                <motion.div variants={item}>
                  <StatsCard
                    title="Taxa de Conformidade"
                    value="84.4%"
                    change={{ value: "+5%", positive: true }}
                    icon={CheckCircle}
                  />
                </motion.div>
                <motion.div variants={item}>
                  <StatsCard
                    title="Obrigações Atrasadas"
                    value="25"
                    change={{ value: "-3%", positive: false }}
                    icon={AlertTriangle}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-[#4263EB]">Tipos de Empresa</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {companyTypes.map((company, index) => (
                    <CompanyTypeCard
                      key={company.type}
                      type={company.type}
                      count={company.count}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </Suspense>
      </main>
    </div>
  );
};

export default Index;