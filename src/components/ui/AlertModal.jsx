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
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title || "Alert"}
        className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-6"
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
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:text-white"
          >
            <FiX />
          </button>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {title}
          </h2>

          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600 dark:text-slate-300">
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
