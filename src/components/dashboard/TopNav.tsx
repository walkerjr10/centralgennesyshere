import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const TopNav = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Logout realizado com sucesso");
      
      // Small timeout to ensure state is cleared before navigation
      setTimeout(() => {
        navigate("/login");
      }, 100);
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error.message || "Erro ao fazer logout");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center space-x-2">
          <a className="flex items-center space-x-2" href="/">
            <span className="font-bold text-primary sm:inline-block">
              Gennesys HUB
            </span>
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="px-4 text-primary hover:bg-primary/10"
          >
            Sair
          </Button>
        </div>
      </div>
    </nav>
  );
};