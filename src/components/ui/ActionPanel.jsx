// import { ChevronRight } from "lucide-react";

// const ActionPanel = ({ actions = [], onActionClick }) => {
//   return (
//     <div className="bg-[#f8fafc] p-5 rounded-2xl shadow-sm">
      
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="font-semibold text-gray-800 text-lg">
//           Command Center
//         </h2>

//         <span className="text-xs bg-[#82C600]/20 text-[#82C600] px-2 py-1 rounded-md">
//           Admin
//         </span>
//       </div>

//       {/* Actions */}
//       <div className="space-y-3">
//         {actions.map((action, index) => (
//           <div
//             key={index}
//             onClick={() => onActionClick(action)}
//             className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:bg-[#82C600]/5 transition-all cursor-pointer group"
//           >
//             {/* Left */}
//             <div className="flex items-center gap-3">
              
//               {/* Icon */}
//               <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#82C600]/10 text-[#82C600] group-hover:bg-[#82C600]/20 transition">
//                 {action.icon || "⚡"}
//               </div>

//               {/* Text */}
//               <div>
//                 <p className="text-sm font-medium text-gray-800">
//                   {action.label}
//                 </p>
//                 {action.description && (
//                   <p className="text-xs text-gray-400">
//                     {action.description}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Right Arrow */}
//             <ChevronRight className="text-gray-400 group-hover:text-[#82C600] transition" size={18} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ActionPanel;

import { ChevronRight, PlusCircle, FileText, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActionPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="theme-surface rounded-2xl p-4 sm:p-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
        <h2 className="theme-text text-base font-semibold sm:text-lg">
          Command Center
        </h2>

        <span className="text-xs bg-[#82C600]/20 text-[#82C600] px-2 py-1 rounded-md w-fit">
          Admin
        </span>
      </div>

      {/* Actions */}
      <div className="space-y-3">

        {/* Create Contest */}
        <div
          onClick={() => navigate("/admin/create-contest")}
          className="theme-interactive-row theme-surface flex cursor-pointer items-center justify-between rounded-xl p-3 transition-all group sm:p-4"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-[#82C600]/10 text-[#82C600] group-hover:bg-[#82C600]/20 transition">
              <PlusCircle size={18} />
            </div>

            <div>
              <p className="theme-text text-sm font-medium">
                Create Contest
              </p>
              <p className="theme-text-muted text-xs">
                Add new contest
              </p>
            </div>
          </div>

          <ChevronRight
            className="text-gray-400 group-hover:text-[#82C600]"
            size={18}
          />
        </div>

        {/* Submissions */}
        <div
          onClick={() => navigate("/admin/submission")}
          className="theme-interactive-row theme-surface flex cursor-pointer items-center justify-between rounded-xl p-3 transition-all group sm:p-4"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-[#82C600]/10 text-[#82C600] group-hover:bg-[#82C600]/20 transition">
              <FileText size={18} />
            </div>

            <div>
              <p className="theme-text text-sm font-medium">
                Submissions
              </p>
              <p className="theme-text-muted text-xs">
                View all submissions
              </p>
            </div>
          </div>

          <ChevronRight
            className="text-gray-400 group-hover:text-[#82C600]"
            size={18}
          />
        </div>

        {/* View Contests */}
        <div
          onClick={() => navigate("/admin/all-contests")}
          className="theme-interactive-row theme-surface flex cursor-pointer items-center justify-between rounded-xl p-3 transition-all group sm:p-4"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-[#82C600]/10 text-[#82C600] group-hover:bg-[#82C600]/20 transition">
              <Eye size={18} />
            </div>

            <div>
              <p className="theme-text text-sm font-medium">
                View Contests
              </p>
              <p className="theme-text-muted text-xs">
                All contests list
              </p>
            </div>
          </div>

          <ChevronRight
            className="text-gray-400 group-hover:text-[#82C600]"
            size={18}
          />
        </div>

      </div>
    </div>
  );
};

export default ActionPanel;
