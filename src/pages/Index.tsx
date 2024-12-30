import { Building2, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { CompanyTypeCard } from "@/components/dashboard/CompanyTypeCard";
import { TopNav } from "@/components/dashboard/TopNav";
import { Button } from "@/components/ui/button";

const companyTypes = [
  { type: "Holding", count: 8, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { type: "Family Office", count: 5, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { type: "Corporate", count: 12, image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { type: "Agro", count: 6, image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { type: "Industrial", count: 10, image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { type: "Retail", count: 7, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
];

const Index = () => {
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
            <Button variant="default" className="bg-[#1e1b4b] hover:bg-[#1e1b4b]/90">
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
                image={company.image}
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