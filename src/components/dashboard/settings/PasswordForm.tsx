import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function PasswordForm() {
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const { toast } = useToast();

  async function updatePassword() {
    if (passwords.password !== passwords.confirmPassword) {
      toast({
        title: "Erro ao atualizar senha",
        description: "As senhas não conferem.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: passwords.password
      });

      if (error) throw error;

      toast({
        title: "Senha atualizada",
        description: "Sua senha foi atualizada com sucesso.",
      });

      setPasswords({ password: "", confirmPassword: "" });
    } catch (error) {
      toast({
        title: "Erro ao atualizar senha",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Nova Senha
        </label>
        <Input
          id="password"
          type="password"
          value={passwords.password}
          onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirmar Nova Senha
        </label>
        <Input
          id="confirmPassword"
          type="password"
          value={passwords.confirmPassword}
          onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
        />
      </div>

      <Button
        onClick={updatePassword}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Atualizando..." : "Atualizar Senha"}
      </Button>
    </div>
  );
}