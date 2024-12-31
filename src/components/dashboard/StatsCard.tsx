import { memo } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "../ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: {
    value: string;
    positive: boolean;
  };
  icon: LucideIcon;
}

export const StatsCard = memo(({ title, value, change, icon: Icon }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="p-6 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-gray-600"
            >
              {title}
            </motion.p>
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mt-2 text-gray-800"
            >
              {value}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-sm mt-2 ${change.positive ? 'text-green-500' : 'text-red-500'}`}
            >
              {change.value} from last month
            </motion.p>
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="bg-[#4263EB]/10 p-3 rounded-full"
          >
            <Icon className="w-6 h-6 text-[#4263EB]" />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
});

StatsCard.displayName = 'StatsCard';