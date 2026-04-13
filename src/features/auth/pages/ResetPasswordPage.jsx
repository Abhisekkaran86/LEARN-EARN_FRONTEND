import { useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import logo from "@/assets/Logo.png";
import { resetPasswordApi } from "@/features/auth/authAPI";

const ResetPasswordPage = () => {
  const { token: routeToken } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const queryToken = new URLSearchParams(location.search).get("token");
  const token = routeToken || queryToken || "";

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Reset link is invalid or expired");
      return;
    }
    if (!form.password || !form.confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const { data } = await resetPasswordApi(
        token,
        form.password,
        form.confirmPassword
      );
      toast.success(data.message || "Password reset successful ✅");
      setForm({ password: "", confirmPassword: "" });
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute w-[500px] h-[500px] bg-[#82C600]/30 rounded-full blur-[120px] top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-green-400/20 rounded-full blur-[120px] bottom-[-80px] right-[-80px] animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(130,198,0,0.3)]">
          <div className="text-center mb-8">
            <img src={logo} alt="logo" className="mx-auto w-16 mb-3" />
            <h1 className="text-white font-bold text-xl">Reset Password</h1>
            <p className="text-white/60 text-sm">
              {token
                ? "Enter your new password"
                : "This reset link is invalid or missing a token"}
            </p>
          </div>

          <form onSubmit={handleResetPassword}>
            <div className="relative mb-6">
              <FiLock className="absolute left-4 top-4 text-white/50" />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="w-full pl-10 pr-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none focus:ring-2 focus:ring-[#82C600]"
              />
              <label
                className={`absolute left-10 text-sm transition-all ${
                  form.password ? "top-1 text-xs text-[#a3e635]" : "top-3 text-white/50"
                }`}
              >
                New Password
              </label>
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-4 text-white/60 cursor-pointer"
              >
                {showPass ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <div className="relative mb-6">
              <FiLock className="absolute left-4 top-4 text-white/50" />
              <input
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="w-full pl-10 pr-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none focus:ring-2 focus:ring-[#82C600]"
              />
              <label
                className={`absolute left-10 text-sm transition-all ${
                  form.confirmPassword
                    ? "top-1 text-xs text-[#a3e635]"
                    : "top-3 text-white/50"
                }`}
              >
                Confirm Password
              </label>
              <span
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-4 top-4 text-white/60 cursor-pointer"
              >
                {showConfirmPass ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || !token}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#82C600] to-[#a3e635] text-black font-semibold hover:scale-105 transition shadow-lg disabled:opacity-50"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm text-white/70 hover:text-white mt-6 transition"
          >
            <FiArrowLeft />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
