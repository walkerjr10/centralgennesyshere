interface RememberMeCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const RememberMeCheckbox = ({ checked, onChange }: RememberMeCheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        id="remember"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-[#4263EB] focus:ring-[#4263EB]"
      />
      <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
        Lembrar-me
      </label>
    </div>
  );
};