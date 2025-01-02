import { memo } from "react";
import { motion } from "framer-motion";
import { Folder } from "lucide-react";

interface CompanyTypeListProps {
  type: string;
  count: number;
  index: number;
}

export const CompanyTypeList = memo(({ type, count, index }: CompanyTypeListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Folder className="h-5 w-5 text-blue-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">{type}</h3>
        </div>
        <span className="text-sm font-medium text-gray-500">
          {count} {count === 1 ? 'empresa' : 'empresas'}
        </span>
      </div>
    </motion.div>
  );
});

CompanyTypeList.displayName = 'CompanyTypeList';