import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";

interface UserStatusSelectProps {
  form: UseFormReturn<FormValues>;
  defaultValue?: string;
}

export function UserStatusSelect({ form, defaultValue = 'active' }: UserStatusSelectProps) {
  const { setValue } = form;

  return (
    <div className="space-y-2">
      <label htmlFor="status" className="text-sm font-medium">
        Status
      </label>
      <Select
        defaultValue={defaultValue}
        onValueChange={(value) => setValue("status", value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione o status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Ativo</SelectItem>
          <SelectItem value="inactive">Inativo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}