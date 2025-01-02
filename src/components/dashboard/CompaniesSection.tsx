import { useState } from "react";
import { CompanyTypeCard } from "./CompanyTypeCard";
import { CompanyTypeList } from "./CompanyTypeList";
import { CompaniesHeader } from "./companies/CompaniesHeader";
import { useCompanies } from "@/hooks/use-companies";

export const CompaniesSection = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { companyTypes, isLoading } = useCompanies();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-[#4263EB]">Loading companies...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <CompaniesHeader viewMode={viewMode} onViewModeChange={setViewMode} />
      
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(companyTypes).map(([type, count], index) => (
            <CompanyTypeCard
              key={type}
              type={type}
              count={count}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(companyTypes).map(([type, count], index) => (
            <CompanyTypeList
              key={type}
              type={type}
              count={count}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};