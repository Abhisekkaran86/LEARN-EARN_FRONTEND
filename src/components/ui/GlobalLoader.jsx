// import { useLoader } from "@/context/LoaderContext";

// const GlobalLoader = () => {
//   const { loading } = useLoader();

//   if (!loading) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
//       <div className="flex flex-col items-center gap-4">

//         {/* Spinner */}
//         <div className="relative w-14 h-14">
//           <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
//           <div className="absolute inset-0 rounded-full border-4 border-t-[#82C600] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
//         </div>

//         {/* Text */}
//         <p className="text-sm font-medium text-white tracking-wide animate-pulse">
//           Loading...
//         </p>

//       </div>
//     </div>
//   );
// };

// export default GlobalLoader;

import { Oval } from "react-loader-spinner";
import { useLoader } from "@/context/LoaderContext";

const GlobalLoader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md">
      <Oval
        height={60}
        width={60}
        color="#82C600"
        secondaryColor="#d1fae5"
        strokeWidth={4}
      />
    </div>
  );
};

export default GlobalLoader;