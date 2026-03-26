// layout/MainLayout.jsx
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
       <main className="flex-1">
        <Outlet />
      </main>
      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default MainLayout;