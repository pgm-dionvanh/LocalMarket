import { useField } from "remix-validated-form";

type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
};

export const FormTextInput = ({
  name,
  label,
  placeholder = "",
  type = "text",
}: InputProps) => {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        {...getInputProps({ id: name })}
        placeholder={placeholder}
        type={type}
        className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      />
      {error && <span className="mt-2 text-sm text-red-600">{error}</span>}
    </div>
  );
};