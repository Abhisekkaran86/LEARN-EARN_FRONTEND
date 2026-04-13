import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

import logo from "@/assets/Logo.png";
import { loginUser } from "@/features/auth/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // Read ?redirect=... param so users return to their intended page after login
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect");

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e?.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill all fields ❌");
      return;
    }

    try {
      const res = await dispatch(loginUser(form)).unwrap();

      const userId = res._id || res.user?._id;

      localStorage.setItem("userId", userId);
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("role", res.role);

      toast.success(`Login as ${res.role} ✅`);

      // If there's a redirect URL (e.g. from an invite email link), go there first
      if (redirectPath) {
        navigate(decodeURIComponent(redirectPath));
      } else if (res.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      toast.error(err || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black dark:bg-gray-950">

      {/* ANIMATED BLOBS */}
      <div className="absolute w-[500px] h-[500px] bg-[#82C600]/30 rounded-full blur-[120px] top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-green-400/20 rounded-full blur-[120px] bottom-[-80px] right-[-80px] animate-pulse"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(130,198,0,0.3)]">

          {/* LOGO */}
          <div className="text-center mb-8">
            <img src={logo} alt="logo" className="mx-auto w-16 mb-3" />
            <h1 className="text-white font-bold text-lg">
              DESUN ACADEMY
            </h1>
            <p className="text-white/60 text-sm">
              Next-gen learning platform 🚀
            </p>
          </div>

          <form onSubmit={handleLogin}>
            {/* EMAIL INPUT */}
          <div className="relative mb-6">
            <FiMail className="absolute left-4 top-4 text-white/50 pointer-events-none" />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full pl-10 pr-4 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none focus:ring-2 focus:ring-[#82C600]"
            />

            <label className="absolute left-10 top-3 text-white/50 text-sm transition-all 
              peer-placeholder-shown:top-3 
              peer-placeholder-shown:text-sm 
              peer-focus:top-1 
              peer-focus:text-xs 
              peer-focus:text-[#a3e635]
              peer-not-placeholder-shown:top-1 
              peer-not-placeholder-shown:text-xs 
              peer-not-placeholder-shown:text-[#a3e635]
              pointer-events-none"
            >
              Email Address
            </label>
          </div>

          {/* PASSWORD INPUT */}
          <div className="relative mb-6">
            <FiLock className="absolute left-4 top-4 text-white/50 pointer-events-none" />

            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full pl-10 pr-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none focus:ring-2 focus:ring-[#82C600]"
            />

            <label className="absolute left-10 top-3 text-white/50 text-sm transition-all 
              peer-placeholder-shown:top-3 
              peer-placeholder-shown:text-sm 
              peer-focus:top-1 
              peer-focus:text-xs 
              peer-focus:text-[#a3e635]
              peer-not-placeholder-shown:top-1 
              peer-not-placeholder-shown:text-xs 
              peer-not-placeholder-shown:text-[#a3e635]
              pointer-events-none"
            >
              Password
            </label>

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-4 text-white/60 cursor-pointer"
            >
              {showPass ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* OPTIONS */}
          <div className="flex justify-between text-sm text-white/60 mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#82C600]" />
              Remember
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-[#82C600] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading || !form.email || !form.password}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#82C600] to-[#a3e635] text-black font-semibold flex items-center justify-center gap-2 hover:scale-105 transition shadow-lg"
          >
            {loading ? "Signing in..." : "Sign in"}
            <FiArrowRight />
          </button>

          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-[1px] bg-white/20"></div>
            <span className="text-xs text-white/50">OR</span>
            <div className="flex-1 h-[1px] bg-white/20"></div>
          </div>

          {/* GOOGLE */}
          <button className="w-full border border-white/20 py-3 rounded-xl text-white flex items-center justify-center gap-2 hover:bg-white/10 transition">
            <span className="text-[#fbbc05] font-bold text-lg">G</span>
            Continue with Google
          </button>

          {/* SIGNUP */}
          <p className="text-center text-sm text-white/60 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#a3e635] font-semibold hover:underline"
            >
              Create account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
