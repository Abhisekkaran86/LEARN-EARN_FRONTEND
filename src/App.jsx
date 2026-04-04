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

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeContainer />} />
        </Route>
        <Route path="/contests" element={<ContestsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Auth */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ NOW WORKS */}
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