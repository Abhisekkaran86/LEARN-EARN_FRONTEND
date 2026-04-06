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

// import { Users, FileText, Clock, IndianRupeeIcon,  } from "lucide-react";

// const iconMap = {
//   users: <Users size={20} />,
//   submissions: <FileText size={20} />,
//   pending: <Clock size={20} />,
//   revenue: < IndianRupeeIcon size={20} />,
// };

// const StatCard = ({ title, value, highlight, type, icon }) => {
//   return (
//     <div
//       className={`group p-5 rounded-2xl shadow-sm transition-all duration-300 cursor-pointer
//       ${
//         type === "warning"
//           ? "bg-[#FFD700]/40"
//           : "bg-white"
//       }
//       hover:bg-[#82C600]/10 hover:shadow-md`}
//     >
//       {/* Top Section */}
//       <div className="flex justify-between items-center mb-3">
//         {/* Icon */}
//         <div
//           className="p-2 rounded-lg bg-gray-100 text-gray-600 
//           group-hover:bg-[#82C600]/15 group-hover:text-[#82C600] transition"
//         >
//           {iconMap[icon]}
//         </div>

//         {/* Highlight Badge */}
//         {highlight && (
//           <span
//             className="text-xs bg-[#82C600]/20 text-[#82C600] px-2 py-1 rounded
//             group-hover:bg-[#82C600]/30 transition"
//           >
//             {highlight}
//           </span>
//         )}
//       </div>

//       {/* Title */}
//       <p className="text-gray-500 text-sm group-hover:text-[#82C600] transition">
//         {title}
//       </p>

//       {/* Value */}
//       <h2 className="text-2xl font-bold text-gray-800 mt-1 group-hover:text-[#82C600] transition">
//         {value}
//       </h2>
//     </div>
//   );
// };

// export default StatCard;

import { Users, FileText, Clock } from "lucide-react";

const iconMap = {
  users: <Users size={20} />,
  submissions: <FileText size={20} />,
  pending: <Clock size={20} />,
};

const StatCard = ({ title, value, highlight, type, icon }) => {
  const isWarning = type === "warning";

  return (
    <div
      className={`relative group p-5 rounded-2xl overflow-hidden
      backdrop-blur-sm border transition-all duration-300 cursor-pointer
      
      ${
        isWarning
          ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
          : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
      }

      hover:shadow-xl hover:-translate-y-1`}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="absolute inset-0 bg-[#82C600]/10 blur-xl"></div>
      </div>

      {/* Top Section */}
      <div className="relative z-10 flex justify-between items-center mb-4">
        {/* Icon */}
        <div
          className={`p-2.5 rounded-xl transition-all duration-300
          ${
            isWarning
              ? "bg-yellow-200 text-yellow-700"
              : "bg-gray-100 text-gray-600"
          }
          group-hover:bg-[#82C600] group-hover:text-white`}
        >
          {iconMap[icon]}
        </div>

        {/* Highlight Badge */}
        {highlight && (
          <span
            className="text-xs font-medium px-2 py-1 rounded-lg
            bg-[#82C600]/15 text-[#82C600]
            group-hover:bg-[#82C600] group-hover:text-white transition"
          >
            {highlight}
          </span>
        )}
      </div>

      {/* Title */}
      <p
        className="text-sm font-medium text-gray-500 
        group-hover:text-gray-700 transition"
      >
        {title}
      </p>

      {/* Value */}
      <h2
        className="text-3xl font-bold mt-1 tracking-tight
        text-gray-800 group-hover:text-[#82C600] transition"
      >
        {value}
      </h2>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#82C600] group-hover:w-full transition-all duration-300"></div>
    </div>
  );
};

export default StatCard;