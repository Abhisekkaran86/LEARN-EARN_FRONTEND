import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) => {
  const [show, setShow] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="w-full space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className="relative">
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#82c600]"
        />

        {isPassword && (
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShow(!show)}
          >
            {show ? <FiEyeOff /> : <FiEye />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;