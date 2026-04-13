import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiTarget,
  FiTrendingUp,
  FiAward
} from "react-icons/fi";

import logo from "@/assets/desun.png";
import { registerUser } from "@/features/auth/authSlice";
import { toast } from "react-toastify";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: ""
  });

  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      const { name, email, password, phoneNumber, gender } = form;
      const payload = { name, email, password, phoneNumber, gender };
      await dispatch(registerUser(payload)).unwrap();
      toast.success("Signup Successful ✅");
      navigate("/login");
    } catch (err) {
      toast.error(err || "Something went wrong ❌");
    }
  };

  const getLabelClass = (field) =>
    `absolute left-10 transition-all duration-200 pointer-events-none ${
      form[field] || focused === field
        ? "top-1 text-xs text-[#a3e635]"
        : "top-3 text-white/50"
    }`;

  const inputClass =
    "w-full pl-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none relative z-20";

  return (
    <div className="min-h-screen flex">

      {/* LEFT */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden bg-black text-white p-12 flex-col justify-between">

        <div className="absolute w-[500px] h-[500px] bg-[#82C600]/25 blur-[140px] top-[-150px] left-[-150px] animate-pulse pointer-events-none"></div>
        <div className="absolute w-[400px] h-[400px] bg-green-400/20 blur-[120px] bottom-[-100px] right-[-100px] animate-pulse pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-[#82C600] to-[#a3e635] bg-clip-text text-transparent">
              Desun Academy
            </span>
            <br />
            Build Your Future with Skills
          </h1>

          <p className="mt-4 text-white/60 max-w-sm">
            Compete in real contests, improve your{" "}
            <span className="text-[#a3e635]">skills</span>, and unlock{" "}
            <span className="text-[#a3e635]">career opportunities</span>.
          </p>
        </div>

        <div className="relative z-10 mt-10 space-y-5">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <FiTarget className="text-[#82C600]" />
              <div>
                <p className="text-sm font-medium">Real Contest Experience</p>
                <p className="text-xs text-white/50">Industry-level challenges</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <FiTrendingUp className="text-[#82C600]" />
              <div>
                <p className="text-sm font-medium">Performance Tracking</p>
                <p className="text-xs text-white/50">Track progress</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <FiAward className="text-[#82C600]" />
              <div>
                <p className="text-sm font-medium">Rewards</p>
                <p className="text-xs text-white/50">Earn certifications</p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/40">
          © 2026 Desun Academy
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-center bg-black relative overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-[#82C600]/30 blur-[120px] top-[-100px] right-[-100px] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-md pointer-events-auto">
          <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(130,198,0,0.3)]">

            {/* LOGO */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <div>
                <h1 className="text-white font-bold text-lg">Desun Academy</h1>
                <p className="text-xs text-white/60">Get Placed by Skill</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white text-center">
              Create Account 🚀
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">

              {/* NAME */}
              <div className="relative">
                <FiUser className="absolute left-4 top-4 text-white/50 pointer-events-none" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                  autoComplete="off"
                  className={inputClass}
                />
                <label className={getLabelClass("name")}>Full Name</label>
              </div>

              {/* EMAIL */}
              <div className="relative">
                <FiMail className="absolute left-4 top-4 text-white/50 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  autoComplete="off"
                  className={inputClass}
                />
                <label className={getLabelClass("email")}>Email</label>
              </div>

              {/* PHONE */}
              <div className="relative">
                <FiPhone className="absolute left-4 top-4 text-white/50 pointer-events-none" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  onFocus={() => setFocused("phoneNumber")}
                  onBlur={() => setFocused("")}
                  autoComplete="off"
                  className={inputClass}
                />
                <label className={getLabelClass("phoneNumber")}>Mobile Number</label>
              </div>

              {/* GENDER */}
              <div>
                <p className="text-white/60 text-sm mb-2">Gender</p>
                <div className="grid grid-cols-3 gap-3">
                  {["male", "female", "other"].map((g) => (
                    <div
                      key={g}
                      onClick={() => setForm({ ...form, gender: g })}
                      className={`text-center py-2 rounded-xl cursor-pointer ${
                        form.gender === g
                          ? "bg-[#82C600] text-black"
                          : "border border-white/20 text-white/60"
                      }`}
                    >
                      {g}
                    </div>
                  ))}
                </div>
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <FiLock className="absolute left-4 top-4 text-white/50 pointer-events-none" />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  autoComplete="off"
                  className={inputClass + " pr-10"}
                />
                <label className={getLabelClass("password")}>Password</label>

                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-4 text-white/60 cursor-pointer z-30"
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#82C600] to-[#a3e635] text-black font-semibold flex items-center justify-center gap-2 hover:scale-105 transition"
              >
                {loading ? "Creating..." : "Create Account"}
                <FiArrowRight />
              </button>

              <p className="text-center text-sm text-white/60">
                Already have an account?{" "}
                <Link to="/login" className="text-[#a3e635] font-semibold">
                  Login
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
