import { useState } from "react";
import { useUserManagement } from "@/hooks/use-user-management";
import { UserFormModal } from "./UserFormModal";
import { UserDeleteDialog } from "./UserDeleteDialog";
import { UserSearch } from "./UserSearch";
import { UsersTable } from "./UsersTable";
import { UsersPagination } from "./UsersPagination";
import { Profile, FormValues } from "../types";

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
  const [roleFilter, setRoleFilter] = useState("all");

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
  };

  const handleCloseDeleteDialog = () => {
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      await handleDeleteUser(userToDelete.id);
      handleCloseDeleteDialog();
    }
  };

  const handleFormSubmit = async (values: FormValues) => {
    if (selectedUser) {
      await handleUpdateUser(values);
    } else {
      await handleCreateUser(values);
    }
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = searchTerm
      ? user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesStatus = statusFilter === "all" ? true : user.status === statusFilter;
    const matchesRole = roleFilter === "all" ? true : user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

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
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
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
        filteredProfiles={filteredUsers}
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
        onOpenChange={setIsModalOpen}
        userToEdit={selectedUser}
        onSubmit={handleFormSubmit}
      />

      <UserDeleteDialog
        userToDelete={userToDelete}
        onOpenChange={handleCloseDeleteDialog}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};