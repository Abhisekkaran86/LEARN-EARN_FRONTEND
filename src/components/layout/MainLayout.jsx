import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;
  const hideHeader = path.startsWith("/student/contest/");
  const hideBack =
    path === "/" || path === "/admin" || path === "/student" || hideHeader;

  return (
    <div className="theme-root flex min-h-screen w-full flex-col overflow-x-hidden bg-[var(--theme-bg)]">
      {!hideHeader && <Header />}

      {!hideBack && (
        <div className="sticky top-[80px] z-40 px-3 py-2 sm:px-4">
          <button
            onClick={() => navigate(-1)}
            className="theme-back-button p-2 transition"
          >
            <ArrowLeft size={18} />
          </button>
        </div>
      )}

      <main
        className={`theme-text flex-1 w-full pb-6 ${hideHeader ? "pt-0" : "pt-[80px]"}`}
      >
        <Outlet />
      </main>

      {!hideHeader && <Footer />}
    </div>
  );
};

export default MainLayout;
