import { motion } from "framer-motion";
import { Card } from "../ui/card";

interface CompanyTypeCardProps {
  type: string;
  count: number;
  image: string;
  index: number;
}

export function CompanyTypeCard({ type, count, image, index }: CompanyTypeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="relative overflow-hidden h-48 group cursor-pointer hover:shadow-lg transition-all duration-300">
        <img
          src={image}
          alt={type}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/40" />
        <div className="relative p-6 text-white h-full flex flex-col justify-end">
          <h3 className="text-lg font-semibold">{type}</h3>
          <p className="mt-1 text-gray-200">
            {count} {count === 1 ? 'empresa' : 'empresas'}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}