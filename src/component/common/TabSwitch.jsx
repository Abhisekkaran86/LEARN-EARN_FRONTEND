const RoleToggle = ({ role, setRole }) => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setRole("student")}
        className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
          role === "student"
            ? "bg-white shadow text-[#82c600]"
            : "text-gray-500"
        }`}
      >
        Student
      </button>

      <button
        onClick={() => setRole("admin")}
        className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
          role === "admin"
            ? "bg-white shadow text-[#82c600]"
            : "text-gray-500"
        }`}
      >
        Institution Admin
      </button>
    </div>
  );
};

export default RoleToggle;