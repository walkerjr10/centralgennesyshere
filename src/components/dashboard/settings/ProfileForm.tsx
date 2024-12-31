import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

interface ProfileFormProps {
  profile: Profile | null;
  onProfileUpdate: (profile: Profile) => void;
}

export function ProfileForm({ profile, onProfileUpdate }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [formProfile, setFormProfile] = useState<Profile>({
    username: profile?.username || "",
    full_name: profile?.full_name || "",
    avatar_url: profile?.avatar_url || null,
  });
  const { toast } = useToast();

  async function updateProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error("Usuário não encontrado");

      const updates = {
        id: user.id,
        username: formProfile.username,
        full_name: formProfile.full_name,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;

      onProfileUpdate({ ...formProfile });
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar perfil",
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
        <label htmlFor="full_name" className="text-sm font-medium">
          Nome Completo
        </label>
        <Input
          id="full_name"
          type="text"
          value={formProfile.full_name || ""}
          onChange={(e) => setFormProfile({ ...formProfile, full_name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          Nome de Usuário
        </label>
        <Input
          id="username"
          type="text"
          value={formProfile.username || ""}
          onChange={(e) => setFormProfile({ ...formProfile, username: e.target.value })}
        />
      </div>

      <Button
        onClick={updateProfile}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Atualizando..." : "Atualizar Perfil"}
      </Button>
    </div>
  );
}