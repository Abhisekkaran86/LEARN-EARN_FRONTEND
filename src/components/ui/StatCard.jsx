import { Users, FileText, Clock } from "lucide-react";

const iconMap = {
  users: <Users size={20} />,
  submissions: <FileText size={20} />,
  pending: <Clock size={20} />,
};

const StatCard = ({ title, value, highlight, type, icon }) => {
  const isWarning = type === "warning";

  const displayValue =
    typeof value === "object" && value !== null
      ? value.count ?? 0
      : value;

  return (
    <div
      className={`relative group p-5 rounded-2xl overflow-hidden
        backdrop-blur-sm transition-all duration-300 cursor-pointer
        ${
          isWarning
            ? "border border-yellow-200 bg-gradient-to-br from-yellow-100 to-orange-100 dark:border-yellow-700 dark:from-yellow-900/30 dark:to-orange-900/30"
            : "theme-surface theme-card-hover"
        }
        hover:shadow-xl`}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="absolute inset-0 bg-[#82C600]/10 blur-xl"></div>
      </div>

      {/* Top Section */}
      <div className="relative z-10 flex justify-between items-center mb-4">
        <div
          className={`p-2.5 rounded-xl transition-all duration-300
            ${
              isWarning
                ? "bg-yellow-200 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300"
                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            }
            group-hover:bg-[#82C600] group-hover:text-slate-950`}
        >
          {iconMap[icon]}
        </div>

        {highlight && (
          <span
            className="text-xs font-medium px-2 py-1 rounded-lg
              bg-[#82C600]/15 text-[#82C600]
              group-hover:bg-[#82C600] group-hover:text-slate-950 transition"
          >
            {highlight}
          </span>
        )}
      </div>

      {/* Title */}
      <p className="theme-text-muted text-sm font-medium transition group-hover:text-gray-700 dark:group-hover:text-gray-200">
        {title}
      </p>

      {/* Value */}
      <h2 className="text-3xl font-bold mt-1 tracking-tight text-gray-800 dark:text-white group-hover:text-[#82C600] transition">
        {displayValue}
      </h2>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#82C600] group-hover:w-full transition-all duration-300"></div>
    </div>
  );
};

export default StatCard;
