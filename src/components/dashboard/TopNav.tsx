import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopNavProps {
  onSectionChange: (section: string) => void;
}

interface UserProfile {
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  role: string | null;
}

export function TopNav({ onSectionChange }: TopNavProps) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, avatar_url, role')
          .eq('id', user.id)
          .single();

        setUserProfile({
          full_name: profile?.full_name,
          email: user.email,
          avatar_url: profile?.avatar_url,
          role: profile?.role
        });
      }
    };

    fetchUserProfile();
  }, []);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    onSectionChange(section);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userProfile?.avatar_url || ''} alt={userProfile?.full_name || ''} />
                  <AvatarFallback>{getInitials(userProfile?.full_name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userProfile?.full_name || 'Usuário'}</p>
                  <p className="text-xs leading-none text-muted-foreground">{userProfile?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}