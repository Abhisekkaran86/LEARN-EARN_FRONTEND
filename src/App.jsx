import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "@/routes/AppRoutes";
import GlobalLoader from "@/components/ui/GlobalLoader";
import { useLoader } from "@/context/LoaderContext";
import { connectLoader } from "@/services/axios";

function App() {
  const { showLoader, hideLoader } = useLoader();

  // Wire loader to axios interceptors once
  useEffect(() => {
    connectLoader(showLoader, hideLoader);
  }, [showLoader, hideLoader]);

  return (
    <BrowserRouter>
      <div className="theme-root min-h-screen">
        <GlobalLoader />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
        />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
