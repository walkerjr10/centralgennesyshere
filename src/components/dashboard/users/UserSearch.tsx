import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { UserSearchProps } from "../types";

const statusOptions = [
  { key: "all", label: "Todos", color: "bg-blue-500" },
  { key: "active", label: "Ativos", color: "bg-green-500" },
  { key: "inactive", label: "Inativos", color: "bg-gray-500" },
  { key: "suspended", label: "Suspensos", color: "bg-red-500" }
];

export const UserSearch = ({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange 
}: UserSearchProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-[#4263EB]"
        >
          Usuários
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative max-w-xs"
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar por nome, username ou função..."
            className="pl-10 pr-4 w-[300px] transition-all duration-200 border-gray-200 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 flex-wrap"
      >
        {statusOptions.map((status, index) => (
          <motion.div
            key={status.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { delay: index * 0.1 }
            }}
          >
            <Button
              variant={statusFilter === status.key ? "default" : "outline"}
              size="sm"
              onClick={() => onStatusFilterChange(status.key)}
              className={`
                relative overflow-hidden transition-all duration-200
                ${statusFilter === status.key 
                  ? `bg-[#4263EB] text-white hover:bg-[#3451c7]` 
                  : 'hover:bg-gray-50'
                }
              `}
            >
              <Badge
                variant="outline"
                className={`
                  mr-2 border-0
                  ${status.key === "active"
                    ? "bg-green-500/10 text-green-700"
                    : status.key === "inactive"
                    ? "bg-gray-500/10 text-gray-700"
                    : status.key === "suspended"
                    ? "bg-red-500/10 text-red-700"
                    : "bg-blue-500/10 text-blue-700"
                  }
                `}
              >
                {status.key}
              </Badge>
              {status.label}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};