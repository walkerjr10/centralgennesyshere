import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Pencil, Trash2 } from "lucide-react";
import { UsersTableProps } from "../types";
import { motion, AnimatePresence } from "framer-motion";

export const UsersTable = ({ 
  profiles, 
  isLoading, 
  filteredProfiles, 
  onEditUser, 
  onDeleteUser 
}: UsersTableProps) => {
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
        return "bg-purple-500/10 text-purple-700 hover:bg-purple-500/20";
      case "manager":
        return "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 hover:bg-gray-500/20";
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return "-";
    return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Skeleton className="h-12 w-full" />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">Nome</TableHead>
            <TableHead className="font-semibold">Username</TableHead>
            <TableHead className="font-semibold">Função</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Último acesso</TableHead>
            <TableHead className="text-right font-semibold">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {filteredProfiles?.map((profile) => (
              <motion.tr
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">
                  {profile.full_name || "-"}
                </TableCell>
                <TableCell>{profile.username || "-"}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`${getRoleBadgeColor(profile.role)} transition-colors`}
                  >
                    {profile.role || "user"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`${getStatusColor(profile.status)} transition-colors`}
                  >
                    {profile.status || "active"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {profile.last_sign_in
                    ? formatDate(profile.last_sign_in)
                    : "-"}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditUser(profile)}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteUser(profile)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
          {filteredProfiles?.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Nenhum usuário encontrado
                </motion.div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};