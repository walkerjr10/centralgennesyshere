import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/components/dashboard/types";

export const useUserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | undefined>(undefined);
  const [userToDelete, setUserToDelete] = useState<Profile | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleEditUser = (user: Profile) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (user: Profile) => {
    setUserToDelete(user);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      const { error: deleteAuthError } = await supabase.functions.invoke('delete-user', {
        body: { userId: userToDelete.id }
      });

      if (deleteAuthError) throw deleteAuthError;

      const { error: deleteProfileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userToDelete.id);

      if (deleteProfileError) throw deleteProfileError;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["profiles"] }),
        queryClient.invalidateQueries({ queryKey: ["profiles-count"] })
      ]);

      toast({
        title: "Usuário excluído",
        description: "O usuário foi excluído com sucesso.",
      });

    } catch (error: any) {
      toast({
        title: "Erro ao excluir usuário",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUserToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(undefined);
  };

  const handleSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["profiles"] });
    await queryClient.invalidateQueries({ queryKey: ["profiles-count"] });
    setIsModalOpen(false);
    setSelectedUser(undefined);
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    isModalOpen,
    selectedUser,
    userToDelete,
    handleEditUser,
    handleDeleteUser,
    confirmDelete,
    handleCloseModal,
    handleSuccess,
    setIsModalOpen,
  };
};