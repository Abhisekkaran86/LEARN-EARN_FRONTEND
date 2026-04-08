import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-800 
                 text-gray-800 dark:text-white 
                 hover:scale-105 transition"
    >
      {dark ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ThemeToggle;