// components/Button.jsx
const Button = ({
  children,
  variant = "primary",
  size = "md",
  full = true,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) => {
  // 🎨 VARIANTS
  const variants = {
    primary: "bg-[#82c600] text-white hover:opacity-90",
    outline: "border border-gray-300 text-gray-700 bg-white",
    secondary: "bg-[#fbd300] text-black",
    ghost: "bg-transparent text-gray-700",
  };

  // 📏 SIZES
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-sm",
    lg: "px-6 py-4 text-base",
  };

  return (
    <button
      {...props}
      className={`
        ${full ? "w-full" : ""}
        flex items-center justify-center gap-2
        rounded-xl font-medium transition
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {children}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default Button;