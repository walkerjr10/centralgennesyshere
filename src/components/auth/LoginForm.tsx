import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "./password/PasswordInput";
import { RememberMeCheckbox } from "./remember-me/RememberMeCheckbox";
import { LoginButton } from "./login-button/LoginButton";
import { SignupPrompt } from "./signup-prompt/SignupPrompt";
import { useAuth } from "@/hooks/use-auth";

export const LoginForm = () => {
  const {
    loading,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
  } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md space-y-8"
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <PasswordInput value={password} onChange={setPassword} />

        <div className="flex items-center justify-between">
          <RememberMeCheckbox />
          <a href="#" className="text-sm text-[#4263EB] hover:underline">
            Esqueceu a senha?
          </a>
        </div>

        <LoginButton loading={loading} />
        <SignupPrompt onSignUp={handleSignUp} />
      </form>
    </motion.div>
  );
};