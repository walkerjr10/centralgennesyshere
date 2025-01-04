export interface FormValues {
  id?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  full_name?: string;
  username?: string;
  role?: string;
  status?: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  username: string | null;
  role: string | null;
  status: string | null;
  last_sign_in: string | null;
  avatar_url: string | null;
}

export interface UserSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
}

export interface UsersPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface UsersTableProps {
  profiles: Profile[] | null;
  isLoading: boolean;
  filteredProfiles: Profile[] | null;
  onEditUser: (user: Profile) => void;
  onDeleteUser: (user: Profile) => void;
}

export interface UserDeleteDialogProps {
  userToDelete: Profile | null;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => Promise<void>;
}