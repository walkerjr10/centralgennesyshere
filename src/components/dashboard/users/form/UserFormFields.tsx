import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";

interface UserFormFieldsProps {
  form: UseFormReturn<FormValues>;
  user?: Profile;
}

export function UserFormFields({ form, user }: UserFormFieldsProps) {
  const { register, formState: { errors }, watch } = form;
  const password = watch("password");

  return (
    <>
      {!user && (
        <>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email *
            </label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido"
                }
              })}
              className="w-full"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Senha *
            </label>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "Senha deve ter no mínimo 6 caracteres"
                }
              })}
              className="w-full"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirmar Senha *
            </label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Por favor confirme sua senha",
                validate: value =>
                  value === password || "As senhas não conferem"
              })}
              className="w-full"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
        </>
      )}

      <div className="space-y-2">
        <label htmlFor="full_name" className="text-sm font-medium">
          Nome Completo
        </label>
        <Input
          id="full_name"
          {...register("full_name")}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          Nome de Usuário
        </label>
        <Input
          id="username"
          {...register("username")}
          className="w-full"
        />
      </div>
    </>
  );
}