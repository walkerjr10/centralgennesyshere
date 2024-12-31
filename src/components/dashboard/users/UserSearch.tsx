import { Input } from "@/components/ui/input";
import { UserSearchProps } from "./types";

export const UserSearch = ({ searchTerm, onSearchChange }: UserSearchProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-[#4263EB]">Usuários</h2>
      <Input
        type="search"
        placeholder="Buscar usuários..."
        className="max-w-xs"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};