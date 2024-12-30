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

export function StatsCard({ title, value, change, icon: Icon }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 bg-white hover:shadow-md transition-shadow border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <h3 className="text-2xl font-bold mt-2 text-gray-800">{value}</h3>
            <p className={`text-sm mt-2 ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
              {change.value} from last month
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-full">
            <Icon className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}