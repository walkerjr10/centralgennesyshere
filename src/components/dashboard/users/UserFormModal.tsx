import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserFormFields } from "./form/UserFormFields";
import { Profile } from "../types";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FormValues } from "./types";

interface UserFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userToEdit?: Profile | null;
  onSubmit: (data: Partial<Profile>) => Promise<void>;
}

export function UserFormModal({ isOpen, onOpenChange, onSubmit, userToEdit }: UserFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      full_name: userToEdit?.full_name || "",
      username: userToEdit?.username || "",
      role: userToEdit?.role || "user",
      status: userToEdit?.status || "active",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      onOpenChange(false);
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