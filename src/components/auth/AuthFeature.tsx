import { motion } from "framer-motion";

interface AuthFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const AuthFeature = ({ icon, title, description }: AuthFeatureProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="flex items-start space-x-4"
  >
    <div className="w-10 h-10 bg-white/20 rounded-lg p-2.5 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  </motion.div>
);