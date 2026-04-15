// import { useLoader } from "@/context/LoaderContext";

// const GlobalLoader = () => {
//   const { loading } = useLoader();

//   if (!loading) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(16,24,40,0.78),rgba(6,10,20,0.94)_42%,rgba(2,6,23,0.98)_100%)] p-4 sm:p-6 backdrop-blur-md">
//       <div
//         className="desun-loader"
//         role="status"
//         aria-live="polite"
//         aria-label="DESUN is loading"
//       >
//         <div className="desun-loader__halo" aria-hidden="true" />
//         <div className="desun-loader__ring desun-loader__ring--outer" aria-hidden="true" />
//         <div className="desun-loader__ring desun-loader__ring--middle" aria-hidden="true" />
//         <div className="desun-loader__ring desun-loader__ring--inner" aria-hidden="true" />

//         <div className="desun-loader__core">
//           <span className="desun-loader__line" aria-hidden="true" />
//           <span className="desun-loader__wordmark">DESUN</span>
//           <span className="desun-loader__line" aria-hidden="true" />
//         </div>

//         <span className="desun-loader__beam" aria-hidden="true" />
//       </div>
//     </div>
//   );
// };

// export default GlobalLoader;


import { useLoader } from "@/context/LoaderContext";
import { useLocation } from "react-router-dom";

const GlobalLoader = () => {
  const { loading } = useLoader();
  const location = useLocation();

  // ❌ Disable loader on home page
  if (location.pathname === "/") return null;

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(16,24,40,0.78),rgba(6,10,20,0.94)_42%,rgba(2,6,23,0.98)_100%)] backdrop-blur-md">
      <div className="desun-loader">
        <div className="desun-loader__halo" />
        <div className="desun-loader__ring desun-loader__ring--outer" />
        <div className="desun-loader__ring desun-loader__ring--middle" />
        <div className="desun-loader__ring desun-loader__ring--inner" />

        <div className="desun-loader__core">
          <span className="desun-loader__line" />
          <span className="desun-loader__wordmark">DESUN</span>
          <span className="desun-loader__line" />
        </div>

        <span className="desun-loader__beam" />
      </div>
    </div>
  );
};

export default GlobalLoader;