import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";

interface UserRoleSelectProps {
  form: UseFormReturn<FormValues>;
  defaultValue?: string;
}

export function UserRoleSelect({ form, defaultValue = 'user' }: UserRoleSelectProps) {
  const { setValue } = form;

  return (
    <div className="space-y-2">
      <label htmlFor="role" className="text-sm font-medium">
        Função
      </label>
      <Select
        defaultValue={defaultValue}
        onValueChange={(value) => setValue("role", value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione a função" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Administrador</SelectItem>
          <SelectItem value="user">Usuário</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}