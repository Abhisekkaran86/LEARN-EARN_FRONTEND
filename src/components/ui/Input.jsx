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
        <label className="text-sm text-gray-600">{label}</label>
      )}

      <div className="relative mt-1">
        
        {/* LEFT ICON */}
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </span>
        )}

        <input
          type={type}
          {...props}
          className={`
            w-full px-4 py-3 rounded-xl border
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${error ? "border-red-400" : "border-gray-200"}
            bg-white/80 backdrop-blur
            focus:outline-none focus:ring-2 focus:ring-[#82c600]
            transition
            ${className}
          `}
        />

        {/* RIGHT ICON */}
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
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