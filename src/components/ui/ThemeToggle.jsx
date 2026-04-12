import { useTheme } from "@/context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="relative p-2.5 rounded-xl border border-gray-200 dark:border-gray-600
        bg-gray-100 dark:bg-gray-800
        text-gray-700 dark:text-yellow-400
        hover:scale-110 hover:shadow-md
        active:scale-95
        transition-all duration-200"
    >
      {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
};

export default ThemeToggle;
