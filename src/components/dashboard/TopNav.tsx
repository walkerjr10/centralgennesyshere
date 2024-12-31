import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TopNavProps {
  onSectionChange: (section: string) => void;
}

export function TopNav({ onSectionChange }: TopNavProps) {
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    onSectionChange(section);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Button
            variant={activeSection === "dashboard" ? "default" : "ghost"}
            onClick={() => handleSectionChange("dashboard")}
          >
            Dashboard
          </Button>
          <Button
            variant={activeSection === "users" ? "default" : "ghost"}
            onClick={() => handleSectionChange("users")}
          >
            Usuários
          </Button>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={handleSignOut}
          >
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}