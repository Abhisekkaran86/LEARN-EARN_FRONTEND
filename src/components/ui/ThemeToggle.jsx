import { useTheme } from "@/context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="theme-icon-button relative rounded-xl p-2.5
        hover:scale-[1.04] hover:shadow-md
        active:scale-95"
    >
      {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
};

export default ThemeToggle;
