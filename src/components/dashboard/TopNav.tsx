import { useState } from "react";
import { UserMenu } from "./nav/UserMenu";
import { NavItem } from "./nav/NavItem";
import { Building2, LayoutDashboard, Users } from "lucide-react";

interface TopNavProps {
  onSectionChange: (section: string) => void;
  isAdmin?: boolean;
}

export const TopNav = ({ onSectionChange, isAdmin }: TopNavProps) => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    onSectionChange(section);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <NavItem
              label="Dashboard"
              icon={LayoutDashboard}
              isActive={activeSection === "dashboard"}
              onClick={() => handleSectionChange("dashboard")}
            />

            <NavItem
              label="Empresas"
              icon={Building2}
              isActive={activeSection === "companies"}
              onClick={() => handleSectionChange("companies")}
            />

            {isAdmin && (
              <NavItem
                label="Usuários"
                icon={Users}
                isActive={activeSection === "users"}
                onClick={() => handleSectionChange("users")}
              />
            )}
          </div>

          <div className="flex items-center">
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};