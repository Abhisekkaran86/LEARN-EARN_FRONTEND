import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "@/assets/Logo.png";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://learn-earn-contest-3.onrender.com/api/v1/auth/forgot-password`,
        { email }
      );
      toast.success(data.message || "Reset link sent to your email ✅");
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong ❌");
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
            <h1 className="text-white font-bold text-xl">Forgot Password</h1>
            <p className="text-white/60 text-sm">
              Enter your email to receive reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword}>
            <div className="relative mb-6">
              <FiMail className="absolute left-4 top-4 text-white/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none focus:ring-2 focus:ring-[#82C600]"
              />
              <label
                className={`absolute left-10 text-sm transition-all ${
                  email ? "top-1 text-xs text-[#a3e635]" : "top-3 text-white/50"
                }`}
              >
                Email Address
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#82C600] to-[#a3e635] text-black font-semibold hover:scale-105 transition shadow-lg disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPasswordPage;
