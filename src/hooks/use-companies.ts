import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCompanies = () => {
  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });

  // Define all possible company types
  const allCompanyTypes = [
    "Holding",
    "Family Office",
    "Corporate",
    "Agro",
    "Industrial",
    "Têxtil",
    "Incorporadora"
  ];

  // Group companies by type and count them
  const companyTypes = companies?.reduce((acc: Record<string, number>, company) => {
    acc[company.type] = (acc[company.type] || 0) + 1;
    return acc;
  }, {}) || {};

  // Ensure all company types are represented, even if count is 0
  const completeCompanyTypes = allCompanyTypes.reduce((acc: Record<string, number>, type) => {
    acc[type] = companyTypes[type] || 0;
    return acc;
  }, {});

  return {
    isLoading,
    companyTypes: completeCompanyTypes
  };
};