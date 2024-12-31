import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { UserSearch } from "./users/UserSearch";
import { UsersTable } from "./users/UsersTable";
import { UsersPagination } from "./users/UsersPagination";
import { UserFormModal } from "./users/UserFormModal";
import { Profile } from "./types";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ITEMS_PER_PAGE = 10;

const UsersSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | undefined>(undefined);
  const [userToDelete, setUserToDelete] = useState<Profile | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: { data: totalProfiles } = {}, isLoading: countLoading } = useQuery({
    queryKey: ["profiles-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });
      return { data: count };
    },
  });

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["profiles", currentPage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1);

      if (error) throw error;
      return data as Profile[];
    },
  });

  const filteredProfiles = profiles?.filter((profile) => {
    const matchesSearch =
      !searchTerm ||
      profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.role?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || profile.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalPages = totalProfiles ? Math.ceil(totalProfiles / ITEMS_PER_PAGE) : 0;

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
      // First delete from auth.users using an edge function
      const { error: deleteAuthError } = await supabase.functions.invoke('delete-user', {
        body: { userId: userToDelete.id }
      });

      if (deleteAuthError) throw deleteAuthError;

      // Then delete from profiles
      const { error: deleteProfileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userToDelete.id);

      if (deleteProfileError) throw deleteProfileError;

      // Refresh both queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["profiles"] }),
        queryClient.invalidateQueries({ queryKey: ["profiles-count"] })
      ]);

      toast({
        title: "Usuário excluído",
        description: "O usuário foi excluído com sucesso.",
      });

      // Reset current page if we're on the last page and it's now empty
      const remainingItems = (totalProfiles || 0) - 1;
      const newTotalPages = Math.ceil(remainingItems / ITEMS_PER_PAGE);
      if (currentPage > newTotalPages && currentPage > 1) {
        setCurrentPage(newTotalPages);
      }

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Users</h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <UserSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      
      <UsersTable
        profiles={profiles}
        isLoading={isLoading}
        filteredProfiles={filteredProfiles}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
      
      <UsersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <UserFormModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        user={selectedUser}
        onSuccess={handleSuccess}
      />

      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o usuário{" "}
              {userToDelete?.full_name || userToDelete?.username} e removerá seus dados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UsersSection;