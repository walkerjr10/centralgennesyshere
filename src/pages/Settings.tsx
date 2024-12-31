import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { AvatarUpload } from "@/components/dashboard/settings/AvatarUpload";
import { ProfileForm } from "@/components/dashboard/settings/ProfileForm";
import { PasswordForm } from "@/components/dashboard/settings/PasswordForm";

interface Profile {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

export default function Settings() {
  const [profile, setProfile] = useState<Profile | null>(null);
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
        .select("username, full_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Button
        variant="ghost"
        className="mb-6 hover:bg-transparent"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Dashboard
      </Button>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <AvatarUpload
              url={profile?.avatar_url || null}
              onUploadComplete={(url) => setProfile(prev => ({ ...prev!, avatar_url: url }))}
            />
            <ProfileForm
              profile={profile}
              onProfileUpdate={setProfile}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alterar Senha</CardTitle>
          </CardHeader>
          <CardContent>
            <PasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}