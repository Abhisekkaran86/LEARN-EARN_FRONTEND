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
        theme-surface theme-card-hover
        rounded-xl sm:rounded-2xl
        shadow-sm
        border
        transition-all duration-300
        ${className}
      `}
    >
      {/* HEADER */}
      {(title || action) && (
        <div className="theme-border flex flex-col gap-2 border-b px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
          <h3 className="theme-text text-sm font-semibold sm:text-base md:text-lg">
            {title}
          </h3>
          {action && <div className="text-xs sm:text-sm">{action}</div>}
        </div>
      )}

      {/* BODY */}
      <div className={padding}>{children}</div>

      {/* FOOTER */}
      {footer && (
        <div className="theme-border px-3 py-3 text-xs sm:px-4 sm:text-sm border-t">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
