import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { CompanyTypeCard } from "@/components/dashboard/CompanyTypeCard";
import { TopNav } from "@/components/dashboard/TopNav";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const companyTypes = [
  { type: "Holding", count: 8 },
  { type: "Family Office", count: 5 },
  { type: "Corporate", count: 12 },
  { type: "Agro", count: 6 },
  { type: "Industrial", count: 10 },
  { type: "Retail", count: 7 },
];

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gray-800"
            >
              Visão Geral
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600"
            >
              Análise consolidada - dezembro
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button className="bg-[#4263EB] hover:bg-[#4263EB]/90 text-white">
              Gerar Relatório
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Empresas Ativas"
            value="48"
            change={{ value: "+12%", positive: true }}
            icon={Building2}
          />
          <StatsCard
            title="Receita Total"
            value="R$ 12,50 mi"
            change={{ value: "+15%", positive: true }}
            icon={TrendingUp}
          />
          <StatsCard
            title="Taxa de Conformidade"
            value="84.4%"
            change={{ value: "+5%", positive: true }}
            icon={CheckCircle}
          />
          <StatsCard
            title="Obrigações Atrasadas"
            value="25"
            change={{ value: "-3%", positive: false }}
            icon={AlertTriangle}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Tipos de Empresa</h2>
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
      </main>
    </div>
  );
};

export default Index;