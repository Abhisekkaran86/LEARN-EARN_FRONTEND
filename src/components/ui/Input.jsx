// components/Input.jsx
const Input = ({
  label,
  type = "text",
  error,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      
      {label && (
        <label className="theme-text-soft text-sm">{label}</label>
      )}

      <div className="relative mt-1">
        
        {/* LEFT ICON */}
        {leftIcon && (
          <span className="theme-text-muted absolute left-3 top-1/2 -translate-y-1/2">
            {leftIcon}
          </span>
        )}

        <input
          type={type}
          {...props}
          className={`
            theme-input w-full rounded-xl px-4 py-3
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${error ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}
            backdrop-blur
            transition-all duration-300
            ${className}
          `}
        />

        {/* RIGHT ICON */}
        {rightIcon && (
          <span className="theme-text-muted absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
            {rightIcon}
          </span>
        )}
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
