import { motion } from "framer-motion";
import { Card } from "../ui/card";

interface CompanyTypeCardProps {
  type: string;
  count: number;
  index: number;
}

export function CompanyTypeCard({ type, count, index }: CompanyTypeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="relative overflow-hidden h-32 group cursor-pointer hover:shadow-lg transition-all duration-300 bg-white border border-gray-100">
        <div className="relative p-6 text-gray-800 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{type}</h3>
          </div>
          <p className="mt-1 text-gray-600">
            {count} {count === 1 ? 'empresa' : 'empresas'}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}