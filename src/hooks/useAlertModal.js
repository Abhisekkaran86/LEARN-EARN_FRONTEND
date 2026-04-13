import { useCallback, useRef, useState } from "react";

const getInitialAlertState = () => ({
  isOpen: false,
  title: "",
  message: "",
  variant: "info",
});

const defaultTitles = {
  success: "Success",
  error: "Something went wrong",
  warning: "Attention",
  info: "Notice",
};

const normalizeMessage = (message) => {
  if (typeof message === "string") {
    return message;
  }

  if (message == null) {
    return "";
  }

  return String(message);
};

const useAlertModal = () => {
  const closeActionRef = useRef(null);
  const [alertState, setAlertState] = useState(getInitialAlertState);

  const showAlert = useCallback(({
    title,
    message,
    variant = "info",
    onClose,
  } = {}) => {
    closeActionRef.current = typeof onClose === "function" ? onClose : null;

    setAlertState({
      isOpen: true,
      title: title || defaultTitles[variant] || defaultTitles.info,
      message: normalizeMessage(message),
      variant,
    });
  }, []);

  const closeAlert = useCallback(() => {
    const nextAction = closeActionRef.current;
    closeActionRef.current = null;
    setAlertState(getInitialAlertState());

    if (nextAction) {
      window.setTimeout(() => {
        nextAction();
      }, 0);
    }
  }, []);

  return {
    alertState,
    showAlert,
    closeAlert,
  };
};

export default useAlertModal;
