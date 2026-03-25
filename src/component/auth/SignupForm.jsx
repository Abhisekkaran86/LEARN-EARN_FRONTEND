import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import RoleToggle from "../common/TabSwitch";

const SignupForm = () => {
  const [role, setRole] = useState("student");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (form.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log({ role, ...form });
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">

      {/* Heading */}
      <h2 className="text-xl font-semibold text-center">
        Create Your Account
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Join the world's leading academic network.
      </p>

      {/* Role Toggle */}
      <div className="mb-5">
        <RoleToggle role={role} setRole={setRole} />
      </div>

      {/* Form */}
      <div className="space-y-4">

        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={form.name}
          onChange={handleChange("name")}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="name@university.edu"
          value={form.email}
          onChange={handleChange("email")}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Min. 8 characters"
          value={form.password}
          onChange={handleChange("password")}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Re-enter password"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
        />

        {/* Primary Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2.5 rounded-lg font-semibold text-white transition
          bg-gradient-to-r from-[#82c600] to-[#fbd300]
          hover:opacity-90 shadow-md"
        >
          Sign up with Email
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-400">Or continue with</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google Button */}
        <button className="w-full border py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5"
          />
          Sign up with Google
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <span className="text-[#82c600] font-medium cursor-pointer hover:underline">
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;