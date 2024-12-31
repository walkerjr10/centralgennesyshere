import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserSearchProps } from "./types";

export const UserSearch = ({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange 
}: UserSearchProps) => {
  const statusOptions = ["all", "active", "inactive", "suspended"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#4263EB]">Usuários</h2>
        <Input
          type="search"
          placeholder="Buscar por nome, username ou função..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        {statusOptions.map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusFilterChange(status)}
            className={
              statusFilter === status
                ? "bg-[#4263EB] text-white"
                : "text-gray-600"
            }
          >
            <Badge
              variant="outline"
              className={`mr-2 ${
                status === "active"
                  ? "bg-green-500/10 text-green-700"
                  : status === "inactive"
                  ? "bg-gray-500/10 text-gray-700"
                  : status === "suspended"
                  ? "bg-red-500/10 text-red-700"
                  : ""
              }`}
            >
              {status === "all" ? "todos" : status}
            </Badge>
            {status === "all"
              ? "Todos"
              : status === "active"
              ? "Ativos"
              : status === "inactive"
              ? "Inativos"
              : "Suspensos"}
          </Button>
        ))}
      </div>
    </div>
  );
};