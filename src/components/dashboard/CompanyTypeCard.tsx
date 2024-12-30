import { motion } from "framer-motion";
import { Card } from "../ui/card";

interface CompanyTypeCardProps {
  type: string;
  count: number;
  index: number;
}

// Map company types to images
const companyImages: { [key: string]: string } = {
  "Holding": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "Family Office": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  "Corporate": "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "Agro": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "Industrial": "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "Retail": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
};

export function CompanyTypeCard({ type, count, index }: CompanyTypeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="relative overflow-hidden h-48 group cursor-pointer hover:shadow-lg transition-all duration-300 bg-white border border-gray-100">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={companyImages[type]}
            alt={type}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        </div>
        
        <div className="relative p-6 text-white h-full flex flex-col justify-between z-10">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-2">{type}</h3>
          </motion.div>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="text-lg font-medium"
          >
            {count} {count === 1 ? 'empresa' : 'empresas'}
          </motion.p>
        </div>
      </Card>
    </motion.div>
  );
}