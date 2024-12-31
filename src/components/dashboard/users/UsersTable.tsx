import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { UsersTableProps } from "../types";
import { formatDate } from "@/lib/utils";

export const UsersTable = ({ profiles, isLoading, filteredProfiles, onEditUser, onDeleteUser }: UsersTableProps) => {
  const getStatusColor = (status: string | null) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-500/10 text-green-700 hover:bg-green-500/20";
      case "inactive":
        return "bg-gray-500/10 text-gray-700 hover:bg-gray-500/20";
      case "suspended":
        return "bg-red-500/10 text-red-700 hover:bg-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 hover:bg-gray-500/20";
    }
  };

  const getRoleBadgeColor = (role: string | null) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-[#4263EB]/10 text-[#4263EB] hover:bg-[#4263EB]/20";
      case "manager":
        return "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 hover:bg-gray-500/20";
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-pulse text-[#4263EB]">Carregando...</div>
      </div>
    );
  }

  if (!profiles?.length) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <p className="text-gray-500">Nenhum usuário encontrado.</p>
      </div>
    );
  }

  const displayProfiles = filteredProfiles || profiles;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#4263EB]/5">
            <TableHead className="font-medium text-[#4263EB]">Nome</TableHead>
            <TableHead className="font-medium text-[#4263EB]">Username</TableHead>
            <TableHead className="font-medium text-[#4263EB]">Função</TableHead>
            <TableHead className="font-medium text-[#4263EB]">Status</TableHead>
            <TableHead className="font-medium text-[#4263EB]">Último acesso</TableHead>
            <TableHead className="text-right font-medium text-[#4263EB]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayProfiles.map((profile) => (
            <motion.tr
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="hover:bg-[#4263EB]/5 transition-colors"
            >
              <TableCell className="font-medium">{profile.full_name || '-'}</TableCell>
              <TableCell>{profile.username || '-'}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`${getRoleBadgeColor(profile.role)} uppercase text-xs tracking-wider font-medium transition-colors`}
                >
                  {profile.role?.toUpperCase() || "USER"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`${getStatusColor(profile.status)} uppercase text-xs tracking-wider font-medium transition-colors`}
                >
                  {profile.status?.toUpperCase() || "ACTIVE"}
                </Badge>
              </TableCell>
              <TableCell>{profile.last_sign_in ? formatDate(profile.last_sign_in) : '-'}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditUser(profile)}
                  className="hover:bg-[#4263EB]/10 hover:text-[#4263EB] transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteUser(profile)}
                  className="hover:bg-red-500/10 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};