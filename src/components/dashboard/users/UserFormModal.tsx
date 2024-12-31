import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Profile, FormValues } from "./types";
import { UserFormFields } from "./form/UserFormFields";
import { UserRoleSelect } from "./form/UserRoleSelect";
import { UserStatusSelect } from "./form/UserStatusSelect";

interface UserFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: Profile;
  onSuccess?: () => void;
}

export function UserFormModal({ open, onOpenChange, user, onSuccess }: UserFormModalProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    defaultValues: {
      full_name: user?.full_name || '',
      username: user?.username || '',
      role: user?.role || 'user',
      status: user?.status || 'active',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);

      if (user) {
        // Update existing user
        const { error } = await supabase
          .from("profiles")
          .update({
            full_name: values.full_name,
            username: values.username,
            role: values.role,
            status: values.status
          })
          .eq("id", user.id);

        if (error) throw error;

        toast({
          title: "Usuário atualizado",
          description: "As informações do usuário foram atualizadas com sucesso.",
          variant: "default",
        });
      } else {
        // Validate password match
        if (values.password !== values.confirmPassword) {
          toast({
            title: "Erro",
            description: "As senhas não conferem.",
            variant: "destructive",
          });
          return;
        }

        // Create new user with auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: values.email!,
          password: values.password!,
          options: {
            data: {
              full_name: values.full_name,
              username: values.username,
              role: values.role,
              status: values.status
            }
          }
        });

        if (authError) {
          toast({
            title: "Erro na criação do usuário",
            description: authError.message,
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Usuário criado",
          description: "Um novo usuário foi criado com sucesso.",
          variant: "default",
        });
      }
      
      if (onSuccess) {
        onSuccess();
      }
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Erro",
        description: error.message || "Algo deu errado. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{user ? "Editar Usuário" : "Criar Usuário"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UserFormFields form={form} user={user} />
            <div className="space-y-4 md:col-span-2">
              <UserRoleSelect form={form} defaultValue={user?.role || 'user'} />
              <UserStatusSelect form={form} defaultValue={user?.status || 'active'} />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Carregando..." : user ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}