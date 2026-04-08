import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomeContainer from "./containers/HomeContainer";
import MainLayout from "./layouts/MainLayout";
import AdminRoutes from "./route/AdminRoutes";
import StudentRoutes from "./route/StudentRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContestsPage from "./pages/ContestsPage";

import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ContestDetails from "./pages/ContestDetails";

import { useEffect } from "react";

function App() {

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />
      <Routes>
        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/contests" element={<ContestsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contest/:id" element={<ContestDetails />} />
        </Route>

        {/* Auth */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Admin + Student */}
        {AdminRoutes()}
        {StudentRoutes()}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import HomeContainer from "./containers/HomeContainer";
// import MainLayout from "./layouts/MainLayout";
// import AdminRoutes from "./route/AdminRoutes";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* MAIN WEBSITE */}
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<HomeContainer />} />
//         </Route>

//         {/* AUTH */}
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />

//         {/* ✅ ADMIN ROUTES (DIRECT CALL) */}
//         {AdminRoutes()}

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import HomeContainer from "./containers/HomeContainer";
// import MainLayout from "./layouts/MainLayout";
// import AdminRoutes from "./route/AdminRoutes";
// import StudentRoutes from "./route/StudentRoutes";
// import ContestsPage from "./pages/ContestsPage";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* ✅ MAIN LAYOUT */}
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<HomeContainer />} />
//           <Route path="/contests" element={<ContestsPage />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/contact" element={<ContactPage />} />
//         </Route>

//         {/* AUTH */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* ADMIN + STUDENT */}
//         {AdminRoutes()}
//         {StudentRoutes()}

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;