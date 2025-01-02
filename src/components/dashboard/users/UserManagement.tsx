import { useState } from "react";
import { useUserManagement } from "@/hooks/use-user-management";
import { UserFormModal } from "./UserFormModal";
import { UserDeleteDialog } from "./UserDeleteDialog";
import { UserSearch } from "./UserSearch";
import { UsersTable } from "./UsersTable";
import { UsersPagination } from "./UsersPagination";
import { Profile } from "../types";

export const UserManagement = () => {
  const {
    profiles: users,
    loading,
    error,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    totalPages,
  } = useUserManagement();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [userToDelete, setUserToDelete] = useState<Profile | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleOpenModal = (user: Profile | null = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleOpenDeleteDialog = (user: Profile) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setUserToDelete(null);
    setShowDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      await handleDeleteUser(userToDelete.id);
      handleCloseDeleteDialog();
    }
  };

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <UserSearch 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-[#4263EB] text-white rounded-md hover:bg-[#4263EB]/90"
        >
          Add User
        </button>
      </div>

      <UsersTable
        profiles={users}
        isLoading={loading}
        filteredProfiles={users}
        onEditUser={handleOpenModal}
        onDeleteUser={handleOpenDeleteDialog}
      />

      <UsersPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
        onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
      />

      <UserDeleteDialog
        isOpen={showDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        user={userToDelete}
      />
    </div>
  );
};