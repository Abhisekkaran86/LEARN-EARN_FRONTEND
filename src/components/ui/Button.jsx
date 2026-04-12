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
  const variants = {
    primary: "bg-[#82c600] text-white hover:opacity-90 dark:bg-[#82c600]",
    outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800",
    secondary: "bg-[#fbd300] text-black",
    ghost: "bg-transparent text-gray-700 dark:text-gray-200",
  };

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