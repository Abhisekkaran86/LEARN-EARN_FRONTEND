



// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { FiMail, FiLock } from "react-icons/fi";

// import Input from "../components/ui/Input";
// import Button from "../components/ui/Button";
// import logo from "../assets/Logo.png";
// import { loginUser } from "../features/authSlice";
// import { toast } from "react-toastify";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { loading } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPass, setShowPass] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ✅ UPDATED LOGIN FUNCTION
//   // const handleLogin = async () => {
//   //   // 🔒 Validation
//   //   if (!form.email || !form.password) {
//   //     toast.error("Please fill all fields ❌");
//   //     return;
//   //   }

//   //   try {
      
//   //     const res = await dispatch(loginUser(form)).unwrap();

//   //     console.log("LOGIN RESPONSE:", res);

//   //     const role = res.role;

//   //     if (!role) {
//   //       toast.error("Role not found ❌");
//   //       return;
//   //     }

//   //     toast.success(`Login as ${role} ✅`);

//   //     // ✅ Role based redirect
//   //     if (role === "admin") {
//   //       navigate("/admin/dashboard");
//   //     } else {
//   //       navigate("/student/dashboard");
//   //     }
//   //   } catch (err) {
//   //     console.log(err);
//   //     toast.error(err || "Login failed ❌");
//   //   }
//   // };

//   const handleLogin = async () => {
//   if (!form.email || !form.password) {
//     toast.error("Please fill all fields ❌");
//     return;
//   }

//   try {
//     const res = await dispatch(loginUser(form)).unwrap();

//     console.log("LOGIN RESPONSE:", res);

//     // ✅ 🔥 ADD THIS (IMPORTANT)
//     const userId = res._id || res.user?._id;

//     localStorage.setItem("userId", userId);        // ✅ store userId
//     localStorage.setItem("token", res.accessToken); // (safe backup)
//     localStorage.setItem("role", res.role);         // (safe backup)

//     console.log("STORED USER ID:", userId);

//     const role = res.role;

//     if (!role) {
//       toast.error("Role not found ❌");
//       return;
//     }

//     toast.success(`Login as ${role} ✅`);

//     if (role === "admin") {
//       navigate("/admin/dashboard");
//     } else {
//       navigate("/student/dashboard");
//     }

//   } catch (err) {
//     console.log(err);
//     toast.error(err || "Login failed ❌");
//   }
// };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#eef2f7] px-4">
//       <div className="w-full max-w-md">
//         {/* LOGO */}
//         <div className="text-center mb-8">
//           <img src={logo} alt="logo" className="mx-auto w-20" />
//           <h1 className="font-bold text-lg mt-2 tracking-wide">DESUN ACADEMY</h1>
//           <p className="text-sm text-gray-500">Get Placed by Skills</p>
//         </div>

//         {/* CARD */}
//         <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
//           <h2 className="text-2xl font-semibold text-center">Welcome Back 👋</h2>
//           <p className="text-center text-gray-500 text-sm mt-1">
//             Login to your account
//           </p>

//           <div className="mt-6 space-y-5">
//             <Input
//               label="Email Address"
//               name="email"
//               placeholder="name@email.com"
//               value={form.email}
//               onChange={handleChange}
//               leftIcon={<FiMail />}
//             />

//             <Input
//               label="Password"
//               name="password"
//               type={showPass ? "text" : "password"}
//               placeholder="Enter your password"
//               value={form.password}
//               onChange={handleChange}
//               leftIcon={<FiLock />}
//               rightIcon={
//                 <span
//                   onClick={() => setShowPass(!showPass)}
//                   className="cursor-pointer text-gray-400 hover:text-black"
//                 >
//                   👁
//                 </span>
//               }
//             />

//             {/* REMEMBER + FORGOT */}
//             <div className="flex justify-between items-center text-sm">
//               <label className="flex items-center gap-2 text-gray-600">
//                 <input type="checkbox" className="accent-[#82c600]" /> Remember me
//               </label>
//               <span className="text-[#82c600] cursor-pointer hover:underline">
//                 Forgot password?
//               </span>
//             </div>

//             {/* LOGIN BUTTON */}
//             <Button
//               onClick={handleLogin}
//               size="md"
//               disabled={loading || !form.email || !form.password}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>

//             {/* DIVIDER */}
//             <div className="flex items-center gap-3">
//               <div className="flex-1 h-[1px] bg-gray-200"></div>
//               <span className="text-xs text-gray-400">OR</span>
//               <div className="flex-1 h-[1px] bg-gray-200"></div>
//             </div>

//             {/* GOOGLE */}
//             <Button variant="outline">
//               <span className="text-[#fbd300] font-bold text-lg">G</span> Continue with Google
//             </Button>

//             {/* REGISTER */}
//             <p className="text-center text-sm text-gray-600">
//               Don’t have an account?{" "}
//               <Link
//                 to="/signup"
//                 className="text-[#82c600] font-medium hover:underline"
//               >
//                 Create Account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FiMail,
//   FiLock,
//   FiEye,
//   FiEyeOff,
//   FiArrowRight,
// } from "react-icons/fi";

// import logo from "../assets/Logo.png";
// import { loginUser } from "../features/authSlice";
// import { toast } from "react-toastify";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPass, setShowPass] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async () => {
//     if (!form.email || !form.password) {
//       toast.error("Please fill all fields ❌");
//       return;
//     }

//     try {
//       const res = await dispatch(loginUser(form)).unwrap();

//       const userId = res._id || res.user?._id;

//       localStorage.setItem("userId", userId);
//       localStorage.setItem("token", res.accessToken);
//       localStorage.setItem("role", res.role);

//       toast.success(`Login as ${res.role} ✅`);

//       if (res.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/student/dashboard");
//       }
//     } catch (err) {
//       toast.error(err || "Login failed ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen relative flex items-center justify-center overflow-hidden">

//       {/* 🔥 ANIMATED BACKGROUND */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#82C600] via-[#4d7c0f] to-black animate-pulse"></div>

//       {/* 🔥 GLOW ORBS */}
//       <div className="absolute w-72 h-72 bg-[#82C600]/30 blur-[120px] top-10 left-10"></div>
//       <div className="absolute w-72 h-72 bg-green-400/20 blur-[120px] bottom-10 right-10"></div>

//       {/* 🔥 CARD */}
//       <div className="relative w-full max-w-md z-10">

//         <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8">

//           {/* LOGO */}
//           <div className="text-center mb-6">
//             <img src={logo} alt="logo" className="mx-auto w-16 mb-3 drop-shadow-xl" />
//             <h1 className="text-white font-bold text-lg tracking-wide">
//               DESUN ACADEMY
//             </h1>
//             <p className="text-white/70 text-sm">
//               Welcome back 👋
//             </p>
//           </div>

//           {/* EMAIL */}
//           <div className="mb-4">
//             <div className="flex items-center px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus-within:ring-2 focus-within:ring-[#82C600] transition">
//               <FiMail className="text-white/70 mr-3" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email address"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full bg-transparent outline-none text-white placeholder-white/60"
//               />
//             </div>
//           </div>

//           {/* PASSWORD */}
//           <div className="mb-4">
//             <div className="flex items-center px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus-within:ring-2 focus-within:ring-[#82C600] transition">
//               <FiLock className="text-white/70 mr-3" />
//               <input
//                 type={showPass ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full bg-transparent outline-none text-white placeholder-white/60"
//               />
//               <span
//                 onClick={() => setShowPass(!showPass)}
//                 className="cursor-pointer text-white/70 hover:text-white"
//               >
//                 {showPass ? <FiEyeOff /> : <FiEye />}
//               </span>
//             </div>
//           </div>

//           {/* OPTIONS */}
//           <div className="flex justify-between text-sm mb-6 text-white/70">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" className="accent-[#82C600]" />
//               Remember
//             </label>
//             <span className="hover:text-white cursor-pointer">
//               Forgot?
//             </span>
//           </div>

//           {/* BUTTON */}
//           <button
//             onClick={handleLogin}
//             disabled={loading || !form.email || !form.password}
//             className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-[#82C600] to-[#a3e635] text-black flex items-center justify-center gap-2 hover:scale-[1.03] transition shadow-lg"
//           >
//             {loading ? "Signing in..." : "Sign in"}
//             <FiArrowRight />
//           </button>

//           {/* DIVIDER */}
//           <div className="flex items-center gap-3 my-6">
//             <div className="flex-1 h-[1px] bg-white/20"></div>
//             <span className="text-xs text-white/60">OR</span>
//             <div className="flex-1 h-[1px] bg-white/20"></div>
//           </div>

//           {/* GOOGLE */}
//           <button className="w-full border border-white/20 py-3 rounded-xl flex items-center justify-center gap-2 text-white hover:bg-white/10 transition">
//             <span className="text-[#fbbc05] font-bold text-lg">G</span>
//             Continue with Google
//           </button>

//           {/* SIGNUP */}
//           <p className="text-center text-sm text-white/70 mt-6">
//             Don’t have an account?{" "}
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

// export default Login;


import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

import logo from "../assets/Logo.png";
import { loginUser } from "../features/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
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

      if (res.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      toast.error(err || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">

      {/* 🔥 ANIMATED BLOBS */}
      <div className="absolute w-[500px] h-[500px] bg-[#82C600]/30 rounded-full blur-[120px] top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-green-400/20 rounded-full blur-[120px] bottom-[-80px] right-[-80px] animate-pulse"></div>

      {/* 🔥 CARD */}
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

          {/* 🔥 FLOATING INPUT */}
          <div className="relative mb-6">
            <FiMail className="absolute left-4 top-4 text-white/50" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none focus:ring-2 focus:ring-[#82C600]"
            />
            <label className={`absolute left-10 text-sm transition-all ${
              form.email
                ? "top-1 text-xs text-[#a3e635]"
                : "top-3 text-white/50"
            }`}>
              Email Address
            </label>
          </div>

          {/* PASSWORD */}
          <div className="relative mb-6">
            <FiLock className="absolute left-4 top-4 text-white/50" />
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none focus:ring-2 focus:ring-[#82C600]"
            />
            <label className={`absolute left-10 text-sm transition-all ${
              form.password
                ? "top-1 text-xs text-[#a3e635]"
                : "top-3 text-white/50"
            }`}>
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
            <span className="hover:text-white cursor-pointer">
              Forgot?
            </span>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading || !form.email || !form.password}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#82C600] to-[#a3e635] text-black font-semibold flex items-center justify-center gap-2 hover:scale-105 transition shadow-lg"
          >
            {loading ? "Signing in..." : "Sign in"}
            <FiArrowRight />
          </button>

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
            Don’t have an account?{" "}
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

export default Login;