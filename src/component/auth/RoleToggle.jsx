const RoleToggle = ({ role, setRole }) => {
  return (
    <div className="flex bg-gray-200 rounded-full p-1 mb-4">
      
      <button
        onClick={() => setRole("student")}
        className={`flex-1 py-1 rounded-full text-sm font-medium transition ${
          role === "student"
            ? "bg-white text-primary shadow"
            : "text-gray-600"
        }`}
      >
        Student
      </button>

      <button
        onClick={() => setRole("admin")}
        className={`flex-1 py-1 rounded-full text-sm font-medium transition ${
          role === "admin"
            ? "bg-white text-primary shadow"
            : "text-gray-600"
        }`}
      >
         Admin
      </button>

    </div>
  );
};

export default RoleToggle;