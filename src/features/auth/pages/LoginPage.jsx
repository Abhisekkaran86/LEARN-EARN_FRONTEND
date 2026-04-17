// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   FiMail,
//   FiLock,
//   FiEye,
//   FiEyeOff,
//   FiArrowRight,
// } from "react-icons/fi";

// import logo from "@/assets/Logo.png";
// import {
//   fetchCurrentUserProfile,
//   loginUser,
// } from "@/features/auth/authSlice";
// import { toast } from "react-toastify";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.auth);

//   // Read ?redirect=... param so users return to their intended page after login
//   const params = new URLSearchParams(location.search);
//   const redirectPath = params.get("redirect");

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPass, setShowPass] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e?.preventDefault();

//     if (!form.email || !form.password) {
//       toast.error("Please fill all fields ❌");
//       return;
//     }

//     try {
//       const res = await dispatch(loginUser(form)).unwrap();
//       dispatch(fetchCurrentUserProfile());

//       const userId = res._id || res.user?._id;

//       localStorage.setItem("userId", userId);
//       localStorage.setItem("token", res.accessToken);
//       localStorage.setItem("role", res.role);

//       toast.success(`Login as ${res.role} ✅`);

//       // If there's a redirect URL (e.g. from an invite email link), go there first
//       if (redirectPath) {
//         navigate(decodeURIComponent(redirectPath));
//       } else if (res.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/student/dashboard");
//       }
//     } catch (err) {
//       toast.error(err || "Login failed ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black dark:bg-gray-950">

//       {/* ANIMATED BLOBS */}
//       <div className="absolute w-[500px] h-[500px] bg-[#82C600]/30 rounded-full blur-[120px] top-[-100px] left-[-100px] animate-pulse"></div>
//       <div className="absolute w-[400px] h-[400px] bg-green-400/20 rounded-full blur-[120px] bottom-[-80px] right-[-80px] animate-pulse"></div>

//       {/* CARD */}
//       <div className="relative z-10 w-full max-w-md">

//         <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(130,198,0,0.3)]">

//           {/* LOGO */}
//           <div className="text-center mb-8">
//             <img src={logo} alt="logo" className="mx-auto w-16 mb-3" />
//             <h1 className="text-white font-bold text-lg">
//               DESUN ACADEMY
//             </h1>
//             <p className="text-white/60 text-sm">
//               Next-gen learning platform 🚀
//             </p>
//           </div>

//           <form onSubmit={handleLogin}>
//             {/* EMAIL INPUT */}
//           <div className="relative mb-6">
//             <FiMail className="absolute left-4 top-4 text-white/50 pointer-events-none" />

//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder=" "
//               className="peer w-full pl-10 pr-4 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none focus:ring-2 focus:ring-[#82C600]"
//             />

//             <label className="absolute left-10 top-3 text-white/50 text-sm transition-all 
//               peer-placeholder-shown:top-3 
//               peer-placeholder-shown:text-sm 
//               peer-focus:top-1 
//               peer-focus:text-xs 
//               peer-focus:text-[#a3e635]
//               peer-not-placeholder-shown:top-1 
//               peer-not-placeholder-shown:text-xs 
//               peer-not-placeholder-shown:text-[#a3e635]
//               pointer-events-none"
//             >
//               Email Address
//             </label>
//           </div>

//           {/* PASSWORD INPUT */}
//           <div className="relative mb-6">
//             <FiLock className="absolute left-4 top-4 text-white/50 pointer-events-none" />

//             <input
//               type={showPass ? "text" : "password"}
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               placeholder=" "
//               className="peer w-full pl-10 pr-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none focus:ring-2 focus:ring-[#82C600]"
//             />

//             <label className="absolute left-10 top-3 text-white/50 text-sm transition-all 
//               peer-placeholder-shown:top-3 
//               peer-placeholder-shown:text-sm 
//               peer-focus:top-1 
//               peer-focus:text-xs 
//               peer-focus:text-[#a3e635]
//               peer-not-placeholder-shown:top-1 
//               peer-not-placeholder-shown:text-xs 
//               peer-not-placeholder-shown:text-[#a3e635]
//               pointer-events-none"
//             >
//               Password
//             </label>

//             <span
//               onClick={() => setShowPass(!showPass)}
//               className="absolute right-4 top-4 text-white/60 cursor-pointer"
//             >
//               {showPass ? <FiEyeOff /> : <FiEye />}
//             </span>
//           </div>

//           {/* OPTIONS */}
//           <div className="flex justify-between text-sm text-white/60 mb-6">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" className="accent-[#82C600]" />
//               Remember
//             </label>
//             <Link
//               to="/forgot-password"
//               className="text-sm text-[#82C600] hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           {/* BUTTON */}
//           <button
//             type="submit"
//             disabled={loading || !form.email || !form.password}
//             className="w-full py-3 rounded-xl bg-gradient-to-r from-[#82C600] to-[#a3e635] text-black font-semibold flex items-center justify-center gap-2 hover:scale-105 transition shadow-lg"
//           >
//             {loading ? "Signing in..." : "Sign in"}
//             <FiArrowRight />
//           </button>

//           </form>

//           {/* DIVIDER */}
//           <div className="flex items-center gap-3 my-6">
//             <div className="flex-1 h-[1px] bg-white/20"></div>
//             <span className="text-xs text-white/50">OR</span>
//             <div className="flex-1 h-[1px] bg-white/20"></div>
//           </div>

//           {/* GOOGLE */}
//           {/* <button className="w-full border border-white/20 py-3 rounded-xl text-white flex items-center justify-center gap-2 hover:bg-white/10 transition">
//             <span className="text-[#fbbc05] font-bold text-lg">G</span>
//             Continue with Google
//           </button> */}

//           {/* SIGNUP */}
//           <p className="text-center text-sm text-white/60 mt-6">
//             Don't have an account?{" "}
//             <Link
//               to="/signup"
//               className="text-[#a3e635] font-semibold hover:underline"
//             >
//               Create account
//             </Link>
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   FiMail,
//   FiLock,
//   FiEye,
//   FiEyeOff,
//   FiArrowRight,
//   FiCheckCircle, // ✅ added
// } from "react-icons/fi";

// import logo from "@/assets/Logo.png";
// import {
//   fetchCurrentUserProfile,
//   loginUser,
// } from "@/features/auth/authSlice";
// import { toast } from "react-toastify";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.auth);

//   const params = new URLSearchParams(location.search);
//   const redirectPath = params.get("redirect");

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPass, setShowPass] = useState(false);

//   // ✅ NEW STATE (for professional UX)
//   const [focusPass, setFocusPass] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e?.preventDefault();

//     if (!form.email || !form.password) {
//       toast.error("Please fill all fields ❌");
//       return;
//     }

//     try {
//       const res = await dispatch(loginUser(form)).unwrap();
//       dispatch(fetchCurrentUserProfile());

//       const userId = res._id || res.user?._id;

//       localStorage.setItem("userId", userId);
//       localStorage.setItem("token", res.accessToken);
//       localStorage.setItem("role", res.role);

//       toast.success(`Login as ${res.role} ✅`);

//       if (redirectPath) {
//         navigate(decodeURIComponent(redirectPath));
//       } else if (res.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/student/dashboard");
//       }
//     } catch (err) {
//       toast.error(err || "Login failed ❌");
//     }
//   };

//   return (
//     <div className="theme-page-shell relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">

//       {/* ANIMATED BLOBS */}
//       <div className="absolute w-[500px] h-[500px] bg-[#82C600]/30 rounded-full blur-[120px] top-[-100px] left-[-100px] animate-pulse"></div>
//       <div className="absolute w-[400px] h-[400px] bg-green-400/20 rounded-full blur-[120px] bottom-[-80px] right-[-80px] animate-pulse"></div>

//       <div className="relative z-10 w-full max-w-md">

//         <div className="theme-surface rounded-3xl border p-8 shadow-[0_0_40px_rgba(130,198,0,0.18)]">

//           {/* LOGO */}
//           <div className="text-center mb-8">
//             <img src={logo} alt="logo" className="mx-auto w-16 mb-3" />
//             <h1 className="theme-text font-bold text-lg">
//               DESUN ACADEMY
//             </h1>
//             <p className="theme-text-soft text-sm">
//               Next-gen learning platform 🚀
//             </p>
//           </div>

//           <form onSubmit={handleLogin}>
//             {/* EMAIL */}
//             <div className="relative mb-6">
//               <FiMail className="theme-text-muted pointer-events-none absolute left-4 top-4" />

//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder=" "
//                 className="theme-input peer w-full rounded-xl px-4 pb-2 pl-10 pr-4 pt-5 outline-none"
//               />

//               <label className="theme-text-muted absolute left-10 top-3 text-sm transition-all 
//                 peer-placeholder-shown:top-3 
//                 peer-placeholder-shown:text-sm 
//                 peer-focus:top-1 
//                 peer-focus:text-xs 
//                 peer-focus:text-[#a3e635]
//                 peer-not-placeholder-shown:top-1 
//                 peer-not-placeholder-shown:text-xs 
//                 peer-not-placeholder-shown:text-[#a3e635]
//                 pointer-events-none"
//               >
//                 Email Address
//               </label>
//             </div>

//             {/* PASSWORD */}
//             <div className="relative mb-4">
//               <FiLock className="theme-text-muted pointer-events-none absolute left-4 top-4" />

//               <input
//                 type={showPass ? "text" : "password"}
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 onFocus={() => setFocusPass(true)}   // ✅ added
//                 onBlur={() => setFocusPass(false)}  // ✅ added
//                 placeholder=" "
//                 className="theme-input peer w-full rounded-xl px-4 pb-2 pl-10 pr-10 pt-5 outline-none"
//               />

//               <label className="theme-text-muted absolute left-10 top-3 text-sm transition-all 
//                 peer-placeholder-shown:top-3 
//                 peer-placeholder-shown:text-sm 
//                 peer-focus:top-1 
//                 peer-focus:text-xs 
//                 peer-focus:text-[#a3e635]
//                 peer-not-placeholder-shown:top-1 
//                 peer-not-placeholder-shown:text-xs 
//                 peer-not-placeholder-shown:text-[#a3e635]
//                 pointer-events-none"
//               >
//                 Password
//               </label>

//               <span
//                 onClick={() => setShowPass(!showPass)}
//                 className="theme-text-muted absolute right-4 top-4 cursor-pointer"
//               >
//                 {showPass ? <FiEyeOff /> : <FiEye />}
//               </span>
//             </div>

//             {/* ✅ PROFESSIONAL PASSWORD SUGGESTION */}
//             {focusPass && (
//               <div className="theme-text-soft mb-4 space-y-1 text-xs">
//                 <p className="flex items-center gap-2">
//                   <FiCheckCircle className="text-green-400" /> Minimum 8 characters
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <FiCheckCircle className="text-green-400" /> One uppercase letter
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <FiCheckCircle className="text-green-400" /> One number
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <FiCheckCircle className="text-green-400" /> One special character
//                 </p>
//               </div>
//             )}

//             {/* OPTIONS */}
//             <div className="theme-text-soft mb-6 flex justify-between text-sm">
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" className="accent-[#82C600]" />
//                 Remember
//               </label>
//               <Link
//                 to="/forgot-password"
//                 className="text-sm text-[#82C600] hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>

//             {/* BUTTON */}
//             <button
//               type="submit"
//               disabled={loading || !form.email || !form.password}
//               className="theme-brand-button flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold"
//             >
//               {loading ? "Signing in..." : "Sign in"}
//               <FiArrowRight />
//             </button>
//           </form>

//           {/* SIGNUP */}
//           <p className="theme-text-soft mt-6 text-center text-sm">
//             Don't have an account?{" "}
//             <Link
//               to="/signup"
//               className="text-[#a3e635] font-semibold hover:underline"
//             >
//               Create account
//             </Link>
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

import logo from "@/assets/Logo.png";
import {
  fetchCurrentUserProfile,
  loginUser,
} from "@/features/auth/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect");

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

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
      dispatch(fetchCurrentUserProfile());

      const userId = res._id || res.user?._id;

      localStorage.setItem("userId", userId);
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("role", res.role);

      toast.success(`Login as ${res.role} ✅`);

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
    <div className="theme-page-shell relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">

      {/* 🌈 PREMIUM GRADIENT BACKGROUND */}
      <div className="absolute inset-0 -z-20 
        bg-gradient-to-br 
        from-[#ffffff] via-[#e0f2fe] to-[#dcfce7]
        dark:from-transparent dark:to-transparent" />

      {/* ✨ GLOW EFFECTS */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] 
        bg-gradient-to-r from-blue-200/40 via-green-200/30 to-transparent 
        blur-[120px] rounded-full -z-10" />

      <div className="absolute top-[10%] left-[-120px] w-[400px] h-[400px] 
        bg-green-200/30 blur-[100px] rounded-full -z-10" />

      <div className="absolute bottom-[5%] right-[-120px] w-[400px] h-[400px] 
        bg-blue-200/30 blur-[100px] rounded-full -z-10" />

      <div className="relative z-10 w-full max-w-md">

        {/* 💎 GLASS CARD */}
        <div className="
          theme-surface 
          rounded-3xl 
          border 
          p-8 
          backdrop-blur-2xl
          bg-white/60 dark:bg-[var(--theme-surface)]
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          dark:shadow-[0_0_40px_rgba(130,198,0,0.18)]
          transition-all duration-300
        ">

          {/* LOGO */}
          <div className="text-center mb-8">
            <img src={logo} alt="logo" className="mx-auto w-16 mb-3" />
            <h1 className="theme-text font-bold text-lg tracking-wide">
              DESUN ACADEMY
            </h1>
            <p className="theme-text-soft text-sm">
              Next-gen learning platform 🚀
            </p>
          </div>

          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="relative mb-6">
              <FiMail className="theme-text-muted absolute left-4 top-4" />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder=" "
                className="
                  theme-input peer w-full rounded-xl 
                  px-4 pb-2 pl-10 pr-4 pt-5 outline-none
                  bg-white/70 dark:bg-transparent
                  focus:ring-2 focus:ring-[#82C600]/40
                  transition-all duration-200
                "
              />

              <label className="theme-text-muted absolute left-10 top-3 text-sm transition-all 
                peer-placeholder-shown:top-3 
                peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#82C600]
                peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#82C600]"
              >
                Email Address
              </label>
            </div>

            {/* PASSWORD */}
            <div className="relative mb-4">
              <FiLock className="theme-text-muted absolute left-4 top-4" />

              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setFocusPass(true)}
                onBlur={() => setFocusPass(false)}
                placeholder=" "
                className="
                  theme-input peer w-full rounded-xl 
                  px-4 pb-2 pl-10 pr-10 pt-5 outline-none
                  bg-white/70 dark:bg-transparent
                  focus:ring-2 focus:ring-[#82C600]/40
                  transition-all duration-200
                "
              />

              <label className="theme-text-muted absolute left-10 top-3 text-sm transition-all 
                peer-placeholder-shown:top-3 
                peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#82C600]
                peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#82C600]"
              >
                Password
              </label>

              <span
                onClick={() => setShowPass(!showPass)}
                className="theme-text-muted absolute right-4 top-4 cursor-pointer"
              >
                {showPass ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* PASSWORD RULES */}
            {focusPass && (
              <div className="theme-text-soft mb-4 space-y-1 text-xs">
                <p className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" /> Minimum 8 characters
                </p>
                <p className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" /> One uppercase letter
                </p>
                <p className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" /> One number
                </p>
                <p className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" /> One special character
                </p>
              </div>
            )}

            {/* OPTIONS */}
            <div className="theme-text-soft mb-6 flex justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#82C600]" />
                Remember
              </label>
              <Link
                to="/forgot-password"
                className="text-[#82C600] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading || !form.email || !form.password}
              className="
                theme-brand-button 
                flex w-full items-center justify-center gap-2 
                rounded-xl py-3 font-semibold
                hover:scale-[1.04] hover:shadow-xl
                active:scale-95
                transition-all duration-200
              "
            >
              {loading ? "Signing in..." : "Sign in"}
              <FiArrowRight />
            </button>

          </form>

          {/* SIGNUP */}
          <p className="theme-text-soft mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#82C600] font-semibold hover:underline"
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