import { LayoutGrid, List } from "lucide-react";
import { DashboardHeader } from "../overview/DashboardHeader";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface CompaniesHeaderProps {
  viewMode: "grid" | "list";
  onViewModeChange: (value: "grid" | "list") => void;
}

export const CompaniesHeader = ({ viewMode, onViewModeChange }: CompaniesHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <DashboardHeader 
        title="Empresas" 
        subtitle="Gerenciamento de empresas" 
        showButton={false}
      />
      <ToggleGroup
        type="single"
        value={viewMode}
        onValueChange={(value) => value && onViewModeChange(value as "grid" | "list")}
        className="border rounded-md"
      >
        <ToggleGroupItem value="grid" aria-label="Grid view">
          <LayoutGrid className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="list" aria-label="List view">
          <List className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};