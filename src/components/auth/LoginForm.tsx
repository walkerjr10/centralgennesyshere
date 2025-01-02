import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RememberMeCheckbox } from "@/components/auth/remember-me/RememberMeCheckbox";
import { SignupPrompt } from "@/components/auth/signup-prompt/SignupPrompt";
import { PasswordInput } from "@/components/auth/password/PasswordInput";
import { LoginButton } from "@/components/auth/login-button/LoginButton";

export const LoginForm = () => {
  const { loading, email, setEmail, password, setPassword, handleLogin } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(e);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="exemplo@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <Button variant="link" className="px-0 font-normal text-xs text-[#4263EB]">
              Esqueceu a senha?
            </Button>
          </div>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <RememberMeCheckbox checked={rememberMe} onCheckedChange={setRememberMe} />
      <LoginButton loading={loading} />
      <SignupPrompt />
    </form>
  );
};