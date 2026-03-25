import { useState } from "react";
import Input from "../common/Input";
import RoleToggle from "../common/TabSwitch";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [role, setRole] = useState("student");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    console.log({ role, ...form });
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">

      {/* Heading */}
      <h2 className="text-xl font-semibold text-center">
        Welcome Back
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Login to your account
      </p>

      {/* Role Toggle */}
      <div className="mb-5">
        <RoleToggle role={role} setRole={setRole} />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <Input
          label="Email Address"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange("email")}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange("password")}
        />

        {/* Forgot Password */}
        <div className="text-right text-sm">
          <span className="text-[#82c600] cursor-pointer hover:underline">
            Forgot Password?
          </span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg font-semibold text-white transition
          bg-gradient-to-r from-[#82c600] to-[#fbd300]
          hover:opacity-90 shadow-md"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-400">Or continue with</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="w-full border py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5"
          />
          Login with Google
        </button>

        {/* Signup */}
        <p className="text-sm text-center mt-4 text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/"
            className="text-[#82c600] font-medium hover:underline"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;