import { motion } from "framer-motion";
import { Building2, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import { StatsCard } from "../StatsCard";

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

export const StatsOverview = () => {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
    >
      <motion.div variants={container}>
        <StatsCard
          title="Empresas Ativas"
          value="48"
          change={{ value: "+12%", positive: true }}
          icon={Building2}
        />
      </motion.div>
      <motion.div variants={container}>
        <StatsCard
          title="Receita Total"
          value="R$ 12,50 mi"
          change={{ value: "+15%", positive: true }}
          icon={TrendingUp}
        />
      </motion.div>
      <motion.div variants={container}>
        <StatsCard
          title="Taxa de Conformidade"
          value="84.4%"
          change={{ value: "+5%", positive: true }}
          icon={CheckCircle}
        />
      </motion.div>
      <motion.div variants={container}>
        <StatsCard
          title="Obrigações Atrasadas"
          value="25"
          change={{ value: "-3%", positive: false }}
          icon={AlertTriangle}
        />
      </motion.div>
    </motion.div>
  );
};