// const StatCard = ({ title, value, highlight, type }) => {
//   return (
//     <div
//       className={`p-5 rounded-2xl shadow-sm ${
//         type === "warning" ? "bg-[#FFD700]/40" : "bg-white"
//       }`}
//     >
//       <p className="text-gray-500 text-sm">{title}</p>
//       <h2 className="text-2xl font-bold">{value}</h2>

//       {highlight && (
//         <span className="text-xs bg-[#82C600]/20 text-[#82C600] px-2 py-1 rounded">
//           {highlight}
//         </span>
//       )}
//     </div>
//   );
// };

// export default StatCard;

import { Users, FileText, Clock, IndianRupeeIcon,  } from "lucide-react";

const iconMap = {
  users: <Users size={20} />,
  submissions: <FileText size={20} />,
  pending: <Clock size={20} />,
  revenue: < IndianRupeeIcon size={20} />,
};

const StatCard = ({ title, value, highlight, type, icon }) => {
  return (
    <div
      className={`group p-5 rounded-2xl shadow-sm transition-all duration-300 cursor-pointer
      ${
        type === "warning"
          ? "bg-[#FFD700]/40"
          : "bg-white"
      }
      hover:bg-[#82C600]/10 hover:shadow-md`}
    >
      {/* Top Section */}
      <div className="flex justify-between items-center mb-3">
        {/* Icon */}
        <div
          className="p-2 rounded-lg bg-gray-100 text-gray-600 
          group-hover:bg-[#82C600]/15 group-hover:text-[#82C600] transition"
        >
          {iconMap[icon]}
        </div>

        {/* Highlight Badge */}
        {highlight && (
          <span
            className="text-xs bg-[#82C600]/20 text-[#82C600] px-2 py-1 rounded
            group-hover:bg-[#82C600]/30 transition"
          >
            {highlight}
          </span>
        )}
      </div>

      {/* Title */}
      <p className="text-gray-500 text-sm group-hover:text-[#82C600] transition">
        {title}
      </p>

      {/* Value */}
      <h2 className="text-2xl font-bold text-gray-800 mt-1 group-hover:text-[#82C600] transition">
        {value}
      </h2>
    </div>
  );
};

export default StatCard;