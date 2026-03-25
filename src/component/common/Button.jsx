const Button = ({
  text,
  onClick,
  type = "button",
  full = true,
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        full ? "w-full" : ""
      } bg-[#82c600] hover:bg-[#6cab00] text-white py-2 rounded-lg font-semibold transition`}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button;