import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserFormFields } from "./form/UserFormFields";
import { Profile } from "../types";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FormValues } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userToEdit?: Profile | null;
  onSubmit: () => Promise<void>;
}

export function UserFormModal({ isOpen, onOpenChange, onSubmit, userToEdit }: UserFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    defaultValues: {
      full_name: userToEdit?.full_name || "",
      username: userToEdit?.username || "",
      role: userToEdit?.role || "user",
      status: userToEdit?.status || "active",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (userToEdit) {
        // Update existing user
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            full_name: data.full_name,
            username: data.username,
            role: data.role,
            status: data.status
          })
          .eq('id', userToEdit.id);

        if (updateError) throw updateError;

        toast({
          title: "Usuário atualizado",
          description: "As informações do usuário foram atualizadas com sucesso.",
        });
      } else {
        // Create new user
        const { error: createError } = await supabase.auth.admin.createUser({
          email: data.email!,
          password: data.password!,
          email_confirm: true,
          user_metadata: {
            full_name: data.full_name,
            username: data.username,
          },
          app_metadata: {
            role: data.role,
          },
        });

        if (createError) throw createError;

        toast({
          title: "Usuário criado",
          description: "O novo usuário foi criado com sucesso.",
        });
      }

      await onSubmit();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-[#4263EB]">
            {userToEdit ? "Editar Usuário" : "Novo Usuário"}
          </h2>
          <UserFormFields
            form={form}
            user={userToEdit}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}