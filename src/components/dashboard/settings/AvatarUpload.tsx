import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, Check } from "lucide-react";

interface AvatarUploadProps {
  url: string | null;
  onUploadComplete: (url: string) => void;
  size?: "sm" | "md" | "lg";
}

export function AvatarUpload({ url, onUploadComplete, size = "lg" }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const sizes = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-20 w-20"
  };

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    setSelectedFile(file);

    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  }

  function cancelUpload() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
  }

  async function confirmUpload() {
    if (!selectedFile) return;

    try {
      setUploading(true);

      const fileExt = selectedFile.name.split('.').pop();
      const userId = (await supabase.auth.getUser()).data.user?.id;
      
      if (!userId) throw new Error('Usuário não encontrado');

      const filePath = `${userId}/avatar.${fileExt}`;

      // First, remove the old avatar if it exists
      if (url) {
        const oldFilePath = url.split('/').slice(-2).join('/');
        const { error: deleteError } = await supabase.storage
          .from('avatars')
          .remove([oldFilePath]);
        
        if (deleteError) {
          console.error('Error deleting old avatar:', deleteError);
        }
      }

      // Upload the new avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, selectedFile, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      onUploadComplete(publicUrl);
      toast({
        title: "Avatar atualizado",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      });

      // Clean up
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Erro ao atualizar avatar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className={sizes[size]}>
        <AvatarImage src={previewUrl || url || undefined} alt="Avatar" />
        <AvatarFallback>
          {uploading ? "..." : "?"}
        </AvatarFallback>
      </Avatar>
      
      {!previewUrl ? (
        <Button
          variant="outline"
          size="sm"
          disabled={uploading}
          className="relative"
        >
          <input
            type="file"
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
          />
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? "Enviando..." : "Alterar foto"}
        </Button>
      ) : (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={cancelUpload}
            disabled={uploading}
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button
            size="sm"
            onClick={confirmUpload}
            disabled={uploading}
          >
            <Check className="w-4 h-4 mr-2" />
            Confirmar
          </Button>
        </div>
      )}
    </div>
  );
}