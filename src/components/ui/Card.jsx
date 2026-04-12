const Card = ({
  title,
  action,
  footer,
  children,
  className = "",
  padding = "p-3 sm:p-4 md:p-5",
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800
        rounded-xl sm:rounded-2xl
        shadow-sm hover:shadow-md
        border border-gray-100 dark:border-gray-700
        transition-all duration-300
        ${className}
      `}
    >
      {/* HEADER */}
      {(title || action) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-3 sm:px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base md:text-lg">
            {title}
          </h3>
          {action && <div className="text-xs sm:text-sm">{action}</div>}
        </div>
      )}

      {/* BODY */}
      <div className={padding}>{children}</div>

      {/* FOOTER */}
      {footer && (
        <div className="px-3 sm:px-4 py-3 border-t border-gray-100 dark:border-gray-700 text-xs sm:text-sm">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;