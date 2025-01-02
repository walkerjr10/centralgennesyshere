import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FormValues, Profile } from "@/components/dashboard/types";

export const useUserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const { toast } = useToast();
  const ITEMS_PER_PAGE = 10;

  const { data: profiles, isLoading, error } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Profile[];
    }
  });

  const handleCreateUser = async (values: FormValues) => {
    try {
      const { error } = await supabase.auth.admin.createUser({
        email: values.email!,
        password: values.password!,
        email_confirm: true,
        user_metadata: {
          full_name: values.full_name
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "User created successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateUser = async (values: FormValues) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: values.full_name,
          username: values.username,
          role: values.role,
          status: values.status,
        })
        .eq("id", values.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const totalPages = profiles ? Math.ceil(profiles.length / ITEMS_PER_PAGE) : 0;

  return {
    profiles,
    loading: isLoading,
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
  };
};