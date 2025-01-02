import { motion } from "framer-motion";
import { CompanyTypeCard } from "../CompanyTypeCard";

const companyTypes = [
  { type: "Holding", count: 8 },
  { type: "Family Office", count: 5 },
  { type: "Corporate", count: 12 },
  { type: "Agro", count: 6 },
  { type: "Industrial", count: 10 },
  { type: "Têxtil", count: 7 },
  { type: "Incorporadora", count: 4 },
];

export const CompanyTypesSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="w-full"
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
  );
};