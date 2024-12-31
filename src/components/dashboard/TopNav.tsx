import { useState } from "react";
import { UserMenu } from "./nav/UserMenu";
import { NavItem } from "./nav/NavItem";

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
              isActive={activeSection === "dashboard"}
              onClick={() => handleSectionChange("dashboard")}
            />

            {isAdmin && (
              <NavItem
                label="Usuários"
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