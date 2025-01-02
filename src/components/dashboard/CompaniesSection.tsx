import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "./overview/DashboardHeader";
import { CompanyTypeCard } from "./CompanyTypeCard";

export const CompaniesSection = () => {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-[#4263EB]">Loading companies...</div>
      </div>
    );
  }

  // Group companies by type and count them
  const companyTypes = companies?.reduce((acc: Record<string, number>, company) => {
    acc[company.type] = (acc[company.type] || 0) + 1;
    return acc;
  }, {}) || {};

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

  // Ensure all company types are represented, even if count is 0
  const completeCompanyTypes = allCompanyTypes.reduce((acc: Record<string, number>, type) => {
    acc[type] = companyTypes[type] || 0;
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <DashboardHeader 
        title="Empresas" 
        subtitle="Gerenciamento de empresas" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(completeCompanyTypes).map(([type, count], index) => (
          <CompanyTypeCard
            key={type}
            type={type}
            count={count}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};