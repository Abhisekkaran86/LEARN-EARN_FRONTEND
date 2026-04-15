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
    primary: "theme-brand-button",
    outline: "theme-outline-button",
    secondary: "bg-[#fbd300] text-slate-950 hover:bg-[#f8dc3e]",
    ghost:
      "bg-transparent text-gray-700 hover:bg-[#82c600]/8 dark:text-gray-200 dark:hover:bg-white/8",
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
        rounded-xl border border-transparent font-semibold transition-all duration-300
        disabled:cursor-not-allowed disabled:opacity-60
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
