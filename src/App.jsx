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
    </BrowserRouter>
  );
}

export default App;