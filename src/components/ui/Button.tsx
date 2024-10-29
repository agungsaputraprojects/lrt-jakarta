interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium text-sm transition-colors";
  const variantStyles = {
    primary: "bg-red-500 text-white hover:bg-red-600",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  };

  return (
    <button
      className={`
          ${baseStyles} 
          ${variantStyles[variant]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
      {...props}
    >
      {children}
    </button>
  );
};
