import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserFormFields } from "./form/UserFormFields";
import { Profile } from "../types";
import { motion } from "framer-motion";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Profile>) => Promise<void>;
  userToEdit?: Profile | null;
}

export function UserFormModal({ isOpen, onClose, onSubmit, userToEdit }: UserFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Partial<Profile>) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            userToEdit={userToEdit}
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}