import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { useState } from "react";

interface CompanyTypeCardProps {
  type: string;
  count: number;
  index: number;
}

// Map company types to more contextually appropriate images
const companyImages: { [key: string]: string } = {
  "Holding": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", // Added width param
  "Family Office": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
  "Corporate": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
  "Agro": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
  "Industrial": "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80",
  "Retail": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
};

export function CompanyTypeCard({ type, count, index }: CompanyTypeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2, type: "tween" }
      }}
    >
      <Card className="relative overflow-hidden h-48 group cursor-pointer hover:shadow-lg transition-all duration-300 bg-white border border-gray-100">
        <div className="absolute inset-0 w-full h-full bg-gray-100">
          <img
            src={companyImages[type]}
            alt={type}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        </div>
        
        <div className="relative p-6 text-white h-full flex flex-col justify-between z-10">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2, type: "tween" }}
          >
            <h3 className="text-2xl font-semibold mb-2">{type}</h3>
          </motion.div>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3, type: "tween" }}
            className="text-lg font-medium"
          >
            {count} {count === 1 ? 'empresa' : 'empresas'}
          </motion.p>
        </div>
      </Card>
    </motion.div>
  );
}