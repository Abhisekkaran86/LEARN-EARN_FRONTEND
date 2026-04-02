const Card = ({
  title,
  action,
  footer,
  children,
  className = "",
  padding = "p-4",
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border ${className}`}>
      
      {/* HEADER */}
      {(title || action) && (
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          {action && <div>{action}</div>}
        </div>
      )}

      {/* BODY */}
      <div className={padding}>
        {children}
      </div>

      {/* FOOTER */}
      {footer && (
        <div className="px-4 py-3 border-t">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;