// components/Container.jsx
const Container = ({ children, fluid = false, className = "" }) => {
  return (
    <div
      className={`
        ${fluid ? "w-full" : "max-w-[1280px]"}
        mx-auto
        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;