import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useUserManagement } from "@/hooks/use-user-management";
import { UserFormModal } from "./UserFormModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserSearch } from "./UserSearch";
import { UsersTable } from "./UsersTable";
import { UsersPagination } from "./UsersPagination";
import { UserDeleteDialog } from "./UserDeleteDialog";

const ITEMS_PER_PAGE = 10;

export function UserManagement() {
  const {
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
  } = useUserManagement();

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
      return data;
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

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Usuário
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
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        userToEdit={selectedUser}
        onSubmit={handleSuccess}
      />

      <UserDeleteDialog
        userToDelete={userToDelete}
        onOpenChange={() => setUserToDelete(null)}
        onConfirmDelete={confirmDelete}
      />
    </div>
  );
}