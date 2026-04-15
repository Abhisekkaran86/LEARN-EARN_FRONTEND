import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiX,
} from "react-icons/fi";

const variantStyles = {
  success: {
    icon: FiCheckCircle,
    iconWrapper: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
    button: "bg-emerald-600 text-white hover:bg-emerald-700",
  },
  error: {
    icon: FiAlertCircle,
    iconWrapper: "bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300",
    button: "bg-rose-600 text-white hover:bg-rose-700",
  },
  warning: {
    icon: FiAlertCircle,
    iconWrapper: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
    button: "bg-amber-500 text-slate-950 hover:bg-amber-400",
  },
  info: {
    icon: FiInfo,
    iconWrapper: "bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300",
    button: "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white",
  },
};

const AlertModal = ({
  isOpen,
  title,
  message,
  variant = "info",
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  const currentVariant = variantStyles[variant] || variantStyles.info;
  const Icon = currentVariant.icon;

  return (
    <div
      className="theme-modal-overlay fixed inset-0 z-[10000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title || "Alert"}
        className="theme-modal-panel w-full max-w-md rounded-[28px] p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${currentVariant.iconWrapper}`}
          >
            <Icon className="text-xl" />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close alert"
            className="theme-icon-button rounded-full p-2"
          >
            <FiX />
          </button>
        </div>

        <div className="mt-4">
          <h2 className="theme-text text-xl font-semibold">
            {title}
          </h2>

          <p className="theme-text-soft mt-2 whitespace-pre-line text-sm leading-6">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className={`mt-6 w-full rounded-2xl px-4 py-3 text-sm font-semibold transition ${currentVariant.button}`}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
