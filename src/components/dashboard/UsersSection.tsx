import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UserSearch } from "./users/UserSearch";
import { UsersTable } from "./users/UsersTable";
import { UsersPagination } from "./users/UsersPagination";
import { Profile } from "./users/types";

const ITEMS_PER_PAGE = 10;

const UsersSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div className="space-y-6">
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
      />
      <UsersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UsersSection;