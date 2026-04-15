import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "@/routes/AppRoutes";
import GlobalLoader from "@/components/ui/GlobalLoader";
import { useLoader } from "@/context/LoaderContext";
import { useTheme } from "@/context/ThemeContext";
import { connectLoader } from "@/services/axios";
import { fetchCurrentUserProfile } from "@/features/auth/authSlice";
import { getAuthToken } from "@/utils/authStorage";

function App() {
  const dispatch = useDispatch();
  const { showLoader, hideLoader } = useLoader();
  const { dark } = useTheme();

  // Wire loader to axios interceptors once
  useEffect(() => {
    connectLoader(showLoader, hideLoader);
  }, [showLoader, hideLoader]);

  useEffect(() => {
    if (getAuthToken()) {
      dispatch(fetchCurrentUserProfile());
    }
  }, [dispatch]);

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
          theme={dark ? "dark" : "light"}
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
        />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
