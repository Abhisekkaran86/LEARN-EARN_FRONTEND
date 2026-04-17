// import { useTheme } from "@/context/ThemeContext";
// import { FiSun, FiMoon } from "react-icons/fi";

// const ThemeToggle = () => {
//   const { dark, toggleTheme } = useTheme();

//   return (
//     <button
//       onClick={toggleTheme}
//       aria-label="Toggle dark mode"
//       className="theme-icon-button relative rounded-xl p-2.5
//         hover:scale-[1.04] hover:shadow-md
//         active:scale-95"
//     >
//       {dark ? <FiSun size={25} /> : <FiMoon size={25} />}
//     </button>
//   );
// };

// export default ThemeToggle;

import { useTheme } from "@/context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300
      bg-gradient-to-r from-[#e2e8f0] to-[#cbd5f5]
      dark:from-[#0f172a] dark:to-[#1e293b]
      shadow-inner"
    >
      {/* Sliding Circle */}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center
        bg-white dark:bg-black shadow-md
        transform transition-all duration-300
        ${dark ? "translate-x-6" : "translate-x-0"}`}
      >
        {dark ? (
          <FiSun className="text-yellow-400" size={14} />
        ) : (
          <FiMoon className="text-indigo-600" size={14} />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
