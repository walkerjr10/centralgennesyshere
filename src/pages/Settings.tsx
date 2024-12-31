import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<{
    username: string | null;
    full_name: string | null;
  } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("username, full_name")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar perfil",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error("Usuário não encontrado");

      const updates = {
        id: user.id,
        username: profile?.username,
        full_name: profile?.full_name,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;

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
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="full_name" className="text-sm font-medium">
              Nome Completo
            </label>
            <Input
              id="full_name"
              type="text"
              value={profile?.full_name || ""}
              onChange={(e) => setProfile({ ...profile!, full_name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Nome de Usuário
            </label>
            <Input
              id="username"
              type="text"
              value={profile?.username || ""}
              onChange={(e) => setProfile({ ...profile!, username: e.target.value })}
            />
          </div>

          <Button
            onClick={updateProfile}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Atualizando..." : "Atualizar Perfil"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}