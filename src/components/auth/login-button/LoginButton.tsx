import { Button } from "@/components/ui/button";
import { LoginIcon } from "../AuthIcons";

interface LoginButtonProps {
  loading: boolean;
}

export const LoginButton = ({ loading }: LoginButtonProps) => {
  return (
    <Button 
      className="w-full bg-[#4263EB] hover:bg-[#4263EB]/90 text-white flex items-center justify-center gap-2"
      disabled={loading}
    >
      <span>{loading ? "Entrando..." : "Entrar"}</span>
      <LoginIcon />
    </Button>
  );
};