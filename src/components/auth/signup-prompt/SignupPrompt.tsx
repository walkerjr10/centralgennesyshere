interface SignupPromptProps {
  onSignUp: () => void;
}

export const SignupPrompt = ({ onSignUp }: SignupPromptProps) => {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-600">
        Ainda não é um cliente?{" "}
        <a 
          href="https://wa.link/246k0b" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#4263EB] hover:underline"
        >
          Entre em contato
        </a>
      </p>
    </div>
  );
};