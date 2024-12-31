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
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [formProfile, setFormProfile] = useState<Profile>({
    username: profile?.username || "",
    full_name: profile?.full_name || "",
    avatar_url: profile?.avatar_url || null,
  });
  const { toast } = useToast();

  async function checkUsernameAvailability(username: string) {
    if (!username || username === profile?.username) {
      setUsernameError(null);
      return true;
    }

    const { data: existingUser, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .single();

    if (error && error.code === "PGRST116") {
      // No user found with this username
      setUsernameError(null);
      return true;
    }

    if (existingUser) {
      setUsernameError("Este nome de usuário já está em uso");
      return false;
    }

    setUsernameError(null);
    return true;
  }

  async function updateProfile() {
    try {
      setLoading(true);
      
      // Check username availability before updating
      const isUsernameAvailable = await checkUsernameAvailability(formProfile.username as string);
      if (!isUsernameAvailable) {
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error("Usuário não encontrado");

      const updates = {
        id: user.id,
        username: formProfile.username,
        full_name: formProfile.full_name,
        avatar_url: profile?.avatar_url, // Preserve the avatar_url
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;

      onProfileUpdate({ ...formProfile, avatar_url: profile?.avatar_url });
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
          onChange={(e) => {
            setFormProfile({ ...formProfile, username: e.target.value });
            checkUsernameAvailability(e.target.value);
          }}
          className={usernameError ? "border-red-500" : ""}
        />
        {usernameError && (
          <p className="text-sm text-red-500">{usernameError}</p>
        )}
      </div>

      <Button
        onClick={updateProfile}
        disabled={loading || !!usernameError}
        className="w-full"
      >
        {loading ? "Atualizando..." : "Atualizar Perfil"}
      </Button>
    </div>
  );
}