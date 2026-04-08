
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { FiUser, FiMail, FiLock, FiTarget, FiTrendingUp, FiAward } from "react-icons/fi";

// import Input from "../components/ui/Input";
// import Button from "../components/ui/Button";
// import logo from "../assets/Logo.png";
// import { registerUser } from "../features/authSlice";
// import { toast } from "react-toastify";


// const Signup = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
  
//   // Get loading state from Redux
//   const { loading } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [showPass, setShowPass] = useState(false);
 
 

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await dispatch(registerUser(form)).unwrap();

//       toast.success("Signup Successful ✅");
//       navigate("/login");
//     } catch (err) {
//       toast.error(err || "Something went wrong ❌");
//     }
//   };
//   return (
//     <div className="min-h-screen grid lg:grid-cols-2">
//       {/* 🔥 LEFT SIDE PREMIUM */}
//       <div className="hidden lg:flex flex-col justify-between p-10 relative overflow-hidden bg-gradient-to-br from-[#82c600] to-[#6aa800] text-white">
//         {/* BACKGROUND GLOW */}
//         <div className="absolute top-[-80px] right-[-80px] w-[250px] h-[250px] bg-white/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-[-80px] left-[-80px] w-[250px] h-[250px] bg-[#fbd300]/20 rounded-full blur-3xl"></div>

//         {/* LOGO */}
//         <div className="relative z-10">
//           <img src={logo} alt="logo" className="w-24 mb-4" />
//           <h1 className="text-2xl font-bold">DESUN ACADEMY</h1>
//           <p className="text-sm opacity-90">Get Placed by Skills</p>
//         </div>

//         {/* CONTENT */}
//         <div className="relative z-10 max-w-sm">
//           <h2 className="text-3xl font-bold leading-snug">Learn. Compete. Grow.</h2>
//           <p className="mt-4 text-sm opacity-90">Join India's most advanced academic contest platform.</p>
//           {/* FEATURES */}
//           <ul className="mt-6 space-y-4 text-sm">
//             <li className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm"><FiTarget /> Real-world contests</li>
//             <li className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm"><FiTrendingUp /> Skill-based ranking system</li>
//             <li className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm"><FiAward /> Career growth opportunities</li>
//           </ul>
//         </div>

//         {/* FOOTER */}
//         <p className="relative z-10 text-xs opacity-80">© 2024 Desun Academy</p>
//       </div>

//       {/* 🔥 RIGHT SIDE FORM */}
//       <div className="flex items-center justify-center px-6 py-10 bg-[#f6f7fb]">
//         <div className="w-full max-w-md">
//           {/* MOBILE LOGO */}
//           <div className="text-center mb-6 lg:hidden">
//             <img src={logo} alt="logo" className="mx-auto w-20" />
//             <h1 className="font-bold mt-2">DESUN ACADEMY</h1>
//           </div>

//           {/* CARD */}
//           <div className="bg-white p-8 rounded-2xl shadow-xl">
//             <h2 className="text-2xl font-bold text-center">Create Account</h2>
//             <p className="text-center text-sm text-gray-500 mt-1">Start your journey with us</p>

//             <div className="mt-6 space-y-4">
//               <Input label="Full Name" name="name" placeholder="Enter name" value={form.name} onChange={handleChange} leftIcon={<FiUser />} />
//               <Input label="Email" name="email" placeholder="Enter email" value={form.email} onChange={handleChange} leftIcon={<FiMail />} />
//               <Input 
//                 label="Password" 
//                 name="password" 
//                 type={showPass ? "text" : "password"} 
//                 placeholder="Min 8 characters" 
//                 value={form.password} 
//                 onChange={handleChange} 
//                 leftIcon={<FiLock />} 
//                 rightIcon={<span onClick={() => setShowPass(!showPass)} className="cursor-pointer">👁</span>} 
//               />

//               <Button onClick={handleSubmit} disabled={loading}>
//                 {loading ? "Creating..." : "Create Account"}
//               </Button>

//               {/* DIVIDER */}
//               <div className="flex items-center gap-2">
//                 <div className="flex-1 h-[1px] bg-gray-200"></div>
//                 <span className="text-xs text-gray-400">OR</span>
//                 <div className="flex-1 h-[1px] bg-gray-200"></div>
//               </div>

//               <Button variant="outline">
//                 <span className="text-[#fbd300] font-bold">G</span> Sign up with Google
//               </Button>

//               <p className="text-center text-sm">
//                 Already have an account? <Link to="/login" className="text-[#82c600] font-medium">Login</Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FiUser,
//   FiMail,
//   FiLock,
//   FiPhone,
//   FiEye,
//   FiEyeOff,
//   FiArrowRight,
//   FiTarget,
//   FiTrendingUp,
//   FiAward
// } from "react-icons/fi";

// import logo from "../assets/desun.png";
// import { registerUser } from "../features/authSlice";
// import { toast } from "react-toastify";

// const Signup = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     mobile: "",
//     gender: ""
//   });

//   const [showPass, setShowPass] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       await dispatch(registerUser(form)).unwrap();
//       toast.success("Signup Successful ✅");
//       navigate("/login");
//     } catch (err) {
//       toast.error(err || "Something went wrong ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen flex">

//       {/* 🔥 LEFT SIDE */}
//       <div className="hidden md:flex w-1/2 relative overflow-hidden bg-black text-white p-12 flex-col justify-between perspective-[1200px]">

//         {/* GLOW */}
//         <div className="absolute w-[500px] h-[500px] bg-[#82C600]/30 blur-[140px] top-[-150px] left-[-150px] animate-pulse"></div>
//         <div className="absolute w-[400px] h-[400px] bg-green-400/20 blur-[120px] bottom-[-100px] right-[-100px] animate-pulse"></div>

//         {/* TOP */}
//         <div className="relative z-10">
//           <img src={logo} alt="logo" className="w-14 mb-6" />

//           <h1 className="text-4xl font-bold leading-tight">
//             Build Your Future <br />
//             <span className="text-[#a3e635]">With Skills</span>
//           </h1>

//           <p className="mt-4 text-white/60 max-w-sm">
//             Join contests, improve skills, and unlock career opportunities 🚀
//           </p>
//         </div>

//         {/* 🔥 3D CARDS */}
//         <div className="relative z-10 mt-10 space-y-6">

//           {/* CARD 1 */}
//           <div className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-xl transform rotate-[-4deg] hover:rotate-0 hover:scale-105 transition-all duration-500">
//             <div className="absolute inset-0 rounded-2xl bg-[#82C600]/10 opacity-0 group-hover:opacity-100 blur-xl transition"></div>

//             <div className="relative z-10 flex gap-4">
//               <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#82C600]/20 text-[#82C600]">
//                 <FiTarget />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-white">
//                   Real Contest Experience
//                 </h3>
//                 <p className="text-xs text-white/60 mt-1">
//                   Participate in real-world coding & academic challenges.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* CARD 2 */}
//           <div className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-xl transform rotate-[3deg] hover:rotate-0 hover:scale-105 transition-all duration-500">
//             <div className="absolute inset-0 rounded-2xl bg-[#82C600]/10 opacity-0 group-hover:opacity-100 blur-xl transition"></div>

//             <div className="relative z-10 flex gap-4">
//               <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#82C600]/20 text-[#82C600]">
//                 <FiTrendingUp />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-white">
//                   Skill-Based Ranking
//                 </h3>
//                 <p className="text-xs text-white/60 mt-1">
//                   Track your growth with performance analytics.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* CARD 3 */}
//           <div className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-xl transform rotate-[-3deg] hover:rotate-0 hover:scale-105 transition-all duration-500">
//             <div className="absolute inset-0 rounded-2xl bg-[#82C600]/10 opacity-0 group-hover:opacity-100 blur-xl transition"></div>

//             <div className="relative z-10 flex gap-4">
//               <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#82C600]/20 text-[#82C600]">
//                 <FiAward />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-white">
//                   Rewards & Career Growth
//                 </h3>
//                 <p className="text-xs text-white/60 mt-1">
//                   Earn rewards and unlock career opportunities.
//                 </p>
//               </div>
//             </div>
//           </div>

//         </div>

//         <p className="relative z-10 text-xs text-white/40">
//           © 2026 Desun Academy
//         </p>
//       </div>

//       {/* 🔥 RIGHT SIDE */}
//       <div className="flex-1 flex items-center justify-center bg-black relative overflow-hidden">

//         <div className="absolute w-[400px] h-[400px] bg-[#82C600]/30 blur-[120px] top-[-100px] right-[-100px]"></div>

//         <div className="relative z-10 w-full max-w-md">

//           <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(130,198,0,0.3)]">

//             {/* 🔥 LOGO + TEXT */}
//             <div className="flex items-center justify-center gap-3 mb-6">
//               <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
//               <div>
//                 <h1 className="text-white font-bold text-lg">
//                   Desun Academy
//                 </h1>
//                 <p className="text-xs text-white/60">
//                   Get Placed by Skill
//                 </p>
//               </div>
//             </div>

//             <h2 className="text-2xl font-bold text-white text-center">
//               Create Account 🚀
//             </h2>

//             <div className="mt-6 space-y-4">

//               {/* NAME */}
//               <div className="relative">
//                 <FiUser className="absolute left-4 top-4 text-white/50" />
//                 <input name="name" value={form.name} onChange={handleChange}
//                   className="w-full pl-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none" />
//                 <label className={`absolute left-10 ${form.name ? "top-1 text-xs text-[#a3e635]" : "top-3 text-white/50"}`}>
//                   Full Name
//                 </label>
//               </div>

//               {/* EMAIL */}
//               <div className="relative">
//                 <FiMail className="absolute left-4 top-4 text-white/50" />
//                 <input name="email" value={form.email} onChange={handleChange}
//                   className="w-full pl-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none" />
//                 <label className={`absolute left-10 ${form.email ? "top-1 text-xs text-[#a3e635]" : "top-3 text-white/50"}`}>
//                   Email
//                 </label>
//               </div>

//               {/* MOBILE */}
//               <div className="relative">
//                 <FiPhone className="absolute left-4 top-4 text-white/50" />
//                 <input name="mobile" value={form.mobile} onChange={handleChange}
//                   className="w-full pl-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none" />
//                 <label className={`absolute left-10 ${form.mobile ? "top-1 text-xs text-[#a3e635]" : "top-3 text-white/50"}`}>
//                   Mobile Number
//                 </label>
//               </div>

//               {/* GENDER */}
//               <div>
//                 <p className="text-white/60 text-sm mb-2">Gender</p>
//                 <div className="grid grid-cols-3 gap-3">
//                   {["male", "female", "other"].map((g) => (
//                     <div
//                       key={g}
//                       onClick={() => setForm({ ...form, gender: g })}
//                       className={`text-center py-2 rounded-xl cursor-pointer ${
//                         form.gender === g
//                           ? "bg-[#82C600] text-black"
//                           : "border border-white/20 text-white/60"
//                       }`}
//                     >
//                       {g}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* PASSWORD */}
//               <div className="relative">
//                 <FiLock className="absolute left-4 top-4 text-white/50" />
//                 <input type={showPass ? "text" : "password"} name="password"
//                   value={form.password} onChange={handleChange}
//                   className="w-full pl-10 pr-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none" />
//                 <label className={`absolute left-10 ${form.password ? "top-1 text-xs text-[#a3e635]" : "top-3 text-white/50"}`}>
//                   Password
//                 </label>

//                 <span onClick={() => setShowPass(!showPass)}
//                   className="absolute right-4 top-4 text-white/60 cursor-pointer">
//                   {showPass ? <FiEyeOff /> : <FiEye />}
//                 </span>
//               </div>

//               {/* BUTTON */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="w-full py-3 rounded-xl bg-gradient-to-r from-[#82C600] to-[#a3e635] text-black font-semibold flex items-center justify-center gap-2 hover:scale-105 transition"
//               >
//                 {loading ? "Creating..." : "Create Account"}
//                 <FiArrowRight />
//               </button>

//               <p className="text-center text-sm text-white/60">
//                 Already have an account?{" "}
//                 <Link to="/login" className="text-[#a3e635] font-semibold">
//                   Login
//                 </Link>
//               </p>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

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

import logo from "../assets/desun.png";
import { registerUser } from "../features/authSlice";
import { toast } from "react-toastify";

const Signup = () => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  try {
    const { name, email, password, phoneNumber, gender } = form;

    const payload = {
      name,
      email,
      password,
      phoneNumber,
      gender,
    };

    await dispatch(registerUser(payload)).unwrap();

    toast.success("Signup Successful ✅");
    navigate("/login");
  } catch (err) {
    toast.error(err || "Something went wrong ❌");
  }
};

  return (
    <div className="min-h-screen flex">

      {/* 🔥 LEFT SIDE (PREMIUM BRANDING) */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden bg-black text-white p-12 flex-col justify-between">

        {/* GLOW */}
        <div className="absolute w-[500px] h-[500px] bg-[#82C600]/25 blur-[140px] top-[-150px] left-[-150px] animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-green-400/20 blur-[120px] bottom-[-100px] right-[-100px] animate-pulse"></div>

        {/* BRAND TEXT */}
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

        {/* FEATURE CARDS */}
        <div className="relative z-10 mt-10 space-y-5">

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl hover:border-[#82C600] transition">
            <div className="flex items-center gap-3">
              <FiTarget className="text-[#82C600]" />
              <div>
                <p className="text-sm font-medium">Real Contest Experience</p>
                <p className="text-xs text-white/50">
                  Industry-level challenges to test your skills
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl hover:border-[#82C600] transition">
            <div className="flex items-center gap-3">
              <FiTrendingUp className="text-[#82C600]" />
              <div>
                <p className="text-sm font-medium">Live Performance Tracking</p>
                <p className="text-xs text-white/50">
                  Track progress with smart analytics
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl hover:border-[#82C600] transition">
            <div className="flex items-center gap-3">
              <FiAward className="text-[#82C600]" />
              <div>
                <p className="text-sm font-medium">Rewards & Certification</p>
                <p className="text-xs text-white/50">
                  Earn rewards and boost your career profile
                </p>
              </div>
            </div>
          </div>

        </div>

        <p className="relative z-10 text-xs text-white/40">
          © 2026 Desun Academy
        </p>
      </div>

      {/* 🔥 RIGHT SIDE (FORM) */}
      <div className="flex-1 flex items-center justify-center bg-black relative overflow-hidden">

        <div className="absolute w-[400px] h-[400px] bg-[#82C600]/30 blur-[120px] top-[-100px] right-[-100px]"></div>

        <div className="relative z-10 w-full max-w-md">

          <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(130,198,0,0.3)]">

            {/* ✅ SINGLE LOGO */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="text-white font-bold text-lg">
                  Desun Academy
                </h1>
                <p className="text-xs text-white/60">
                  Get Placed by Skill
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white text-center">
              Create Account 🚀
            </h2>

            <div className="mt-6 space-y-4">

              {/* NAME */}
              <div className="relative">
                <FiUser className="absolute left-4 top-4 text-white/50" />
                <input name="name" value={form.name} onChange={handleChange}
                  className="w-full pl-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none" />
                <label className={`absolute left-10 ${form.name ? "top-1 text-xs text-[#a3e635]" : "top-3 text-white/50"}`}>
                  Full Name
                </label>
              </div>

              {/* EMAIL */}
              <div className="relative">
                <FiMail className="absolute left-4 top-4 text-white/50" />
                <input name="email" value={form.email} onChange={handleChange}
                  className="w-full pl-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none" />
                <label className={`absolute left-10 ${form.email ? "top-1 text-xs text-[#a3e635]" : "top-3 text-white/50"}`}>
                  Email
                </label>
              </div>

              {/* MOBILE */}
              <div className="relative">
                <FiPhone className="absolute left-4 top-4 text-white/50" />
                <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange}
                  className="w-full pl-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none" />
                <label className={`absolute left-10 ${form.phoneNumber ? "top-1 text-xs text-[#a3e635]" : "top-3 text-white/50"}`}>
                  Mobile Number
                </label>
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
                <FiLock className="absolute left-4 top-4 text-white/50" />
                <input type={showPass ? "text" : "password"} name="password"
                  value={form.password} onChange={handleChange}
                  className="w-full pl-10 pr-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none" />
                <label className={`absolute left-10 ${form.password ? "top-1 text-xs text-[#a3e635]" : "top-3 text-white/50"}`}>
                  Password
                </label>

                <span onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-4 text-white/60 cursor-pointer">
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              {/* BUTTON */}
              <button
                onClick={handleSubmit}
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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FiUser,
//   FiMail,
//   FiLock,
//   FiPhone,
//   FiEye,
//   FiEyeOff,
//   FiArrowRight,
//   FiTarget,
//   FiTrendingUp,
//   FiAward
// } from "react-icons/fi";

// import logo from "../assets/desun.png";
// import { registerUser } from "../features/authSlice";
// import { toast } from "react-toastify";

// const Signup = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     mobile: "",
//     gender: ""
//   });

//   const [showPass, setShowPass] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       await dispatch(registerUser(form)).unwrap();
//       toast.success("Signup Successful ✅");
//       navigate("/login");
//     } catch (err) {
//       toast.error(err || "Something went wrong ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen flex">

//       {/* 🔥 LEFT SIDE */}
//       <div className="hidden md:flex w-1/2 relative overflow-hidden bg-black text-white p-12 flex-col justify-between">

//         <div className="absolute w-[500px] h-[500px] bg-[#82C600]/25 blur-[140px] top-[-150px] left-[-150px] animate-pulse"></div>
//         <div className="absolute w-[400px] h-[400px] bg-green-400/20 blur-[120px] bottom-[-100px] right-[-100px] animate-pulse"></div>

//         <div className="relative z-10">
//           <h1 className="text-4xl font-bold leading-tight">
//             <span className="bg-gradient-to-r from-[#82C600] to-[#a3e635] bg-clip-text text-transparent">
//               Desun Academy
//             </span>
//             <br />
//             Build Your Future with Skills
//           </h1>

//           <p className="mt-4 text-white/60 max-w-sm">
//             Compete in real contests, improve your{" "}
//             <span className="text-[#a3e635]">skills</span>, and unlock{" "}
//             <span className="text-[#a3e635]">career opportunities</span>.
//           </p>
//         </div>

//         {/* FEATURES */}
//         <div className="relative z-10 mt-10 space-y-5">

//           {[{
//             icon: <FiTarget />,
//             title: "Real Contest Experience",
//             desc: "Industry-level challenges to test your skills"
//           },{
//             icon: <FiTrendingUp />,
//             title: "Live Performance Tracking",
//             desc: "Track progress with smart analytics"
//           },{
//             icon: <FiAward />,
//             title: "Rewards & Certification",
//             desc: "Earn rewards and boost your career"
//           }].map((item, i) => (
//             <div
//               key={i}
//               className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl hover:border-[#82C600] hover:scale-[1.02] transition-all duration-300"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="text-[#82C600]">{item.icon}</div>
//                 <div>
//                   <p className="text-sm font-medium">{item.title}</p>
//                   <p className="text-xs text-white/50">{item.desc}</p>
//                 </div>
//               </div>
//             </div>
//           ))}

//         </div>

//         <p className="relative z-10 text-xs text-white/40">
//           © 2026 Desun Academy
//         </p>
//       </div>

//       {/* 🔥 RIGHT SIDE */}
//       <div className="flex-1 flex items-center justify-center bg-black relative overflow-hidden">

//         <div className="absolute w-[400px] h-[400px] bg-[#82C600]/30 blur-[120px] top-[-100px] right-[-100px]"></div>

//         <div className="relative z-10 w-full max-w-md">

//           <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(130,198,0,0.3)]">

//             {/* 🔥 LOGO */}
//             <div className="flex items-center justify-center gap-3 mb-6 group cursor-pointer">
//               <img src={logo} alt="logo"
//                 className="w-10 h-10 object-contain transition group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_#82C600]" />
//               <div>
//                 <h1 className="text-white font-bold text-lg">
//                   Desun Academy
//                 </h1>
//                 <p className="text-xs text-white/60">
//                   Get Placed by Skill
//                 </p>
//               </div>
//             </div>

//             <h2 className="text-2xl font-bold text-white text-center">
//               Create Account 🚀
//             </h2>

//             <div className="mt-6 space-y-4">

//               {/* INPUT STYLE */}
//               {[
//                 { name: "name", icon: <FiUser />, label: "Full Name" },
//                 { name: "email", icon: <FiMail />, label: "Email" },
//                 { name: "mobile", icon: <FiPhone />, label: "Mobile Number" }
//               ].map((field) => (
//                 <div className="relative group" key={field.name}>
//                   <span className="absolute left-4 top-4 text-white/50">
//                     {field.icon}
//                   </span>
//                   <input
//                     name={field.name}
//                     value={form[field.name]}
//                     onChange={handleChange}
//                     className="w-full pl-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none focus:ring-2 focus:ring-[#82C600] transition"
//                   />
//                   <label className={`absolute left-10 transition-all ${
//                     form[field.name]
//                       ? "top-1 text-xs text-[#a3e635]"
//                       : "top-3 text-white/50"
//                   }`}>
//                     {field.label}
//                   </label>
//                 </div>
//               ))}

//               {/* GENDER */}
//               <div>
//                 <p className="text-white/60 text-sm mb-2">Gender</p>
//                 <div className="grid grid-cols-3 gap-3">
//                   {["male", "female", "other"].map((g) => (
//                     <div
//                       key={g}
//                       onClick={() => setForm({ ...form, gender: g })}
//                       className={`text-center py-2 rounded-xl cursor-pointer transition ${
//                         form.gender === g
//                           ? "bg-[#82C600] text-black ring-2 ring-[#82C600]"
//                           : "border border-white/20 text-white/60 hover:border-[#82C600]"
//                       }`}
//                     >
//                       {g}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* PASSWORD */}
//               <div className="relative group">
//                 <FiLock className="absolute left-4 top-4 text-white/50" />
//                 <input
//                   type={showPass ? "text" : "password"}
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-10 pt-5 pb-2 rounded-xl bg-white/5 border border-white/20 text-white outline-none focus:ring-2 focus:ring-[#82C600]"
//                 />
//                 <label className={`absolute left-10 ${
//                   form.password
//                     ? "top-1 text-xs text-[#a3e635]"
//                     : "top-3 text-white/50"
//                 }`}>
//                   Password
//                 </label>

//                 <span
//                   onClick={() => setShowPass(!showPass)}
//                   className="absolute right-4 top-4 text-white/60 cursor-pointer hover:text-[#82C600]"
//                 >
//                   {showPass ? <FiEyeOff /> : <FiEye />}
//                 </span>
//               </div>

//               {/* BUTTON */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="w-full py-3 rounded-xl bg-gradient-to-r from-[#82C600] to-[#a3e635] text-black font-semibold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
//               >
//                 {loading ? "Creating..." : "Create Account"}
//                 <FiArrowRight />
//               </button>

//               <p className="text-center text-sm text-white/60">
//                 Already have an account?{" "}
//                 <Link to="/login" className="text-[#a3e635] font-semibold hover:underline">
//                   Login
//                 </Link>
//               </p>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;