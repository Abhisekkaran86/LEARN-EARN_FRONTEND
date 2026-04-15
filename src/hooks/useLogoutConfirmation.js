import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout, logoutUser } from "@/features/auth/authSlice";

const useLogoutConfirmation = ({ redirectTo = "/login" } = {}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const openLogoutModal = useCallback(() => {
    setIsLogoutModalOpen(true);
  }, []);

  const closeLogoutModal = useCallback(() => {
    if (isLoggingOut) {
      return;
    }

    setIsLogoutModalOpen(false);
  }, [isLoggingOut]);

  const confirmLogout = useCallback(async () => {
    try {
      setIsLoggingOut(true);
      await dispatch(logoutUser()).unwrap();
    } catch {
      // Even if API logout fails, clear local auth so the user is signed out.
    } finally {
      dispatch(logout());
      sessionStorage.clear();
      setIsLogoutModalOpen(false);
      setIsLoggingOut(false);
      navigate(redirectTo, { replace: true });
    }
  }, [dispatch, navigate, redirectTo]);

  return {
    isLogoutModalOpen,
    isLoggingOut,
    openLogoutModal,
    closeLogoutModal,
    confirmLogout,
  };
};

export default useLogoutConfirmation;
