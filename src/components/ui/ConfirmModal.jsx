import { FiAlertTriangle } from "react-icons/fi";

const toneClasses = {
  danger: {
    icon: "bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300",
    confirm:
      "bg-rose-600 text-white hover:bg-rose-700 disabled:bg-rose-400",
  },
  primary: {
    icon: "bg-[#82C600]/15 text-[#5f9200] dark:bg-[#82C600]/20 dark:text-[#b7ef52]",
    confirm:
      "bg-[#82C600] text-slate-950 hover:bg-[#74b000] disabled:bg-[#a9d85e]",
  },
};

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "danger",
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) {
    return null;
  }

  const currentTone = toneClasses[tone] || toneClasses.danger;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm"
      onClick={isLoading ? undefined : onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title || "Confirm action"}
        className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${currentTone.icon}`}
        >
          <FiAlertTriangle className="text-xl" />
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {message}
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed ${currentTone.confirm}`}
          >
            {isLoading ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
