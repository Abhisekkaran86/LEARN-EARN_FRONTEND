// // pages/Signup.jsx
// import { useState } from "react";
// import Input from "../components/ui/Input";
// import Button from "../components/ui/Button";
// import {
//   FiUser,
//   FiMail,
//   FiLock,
//   FiTarget,
//   FiTrendingUp,
//   FiAward,
// } from "react-icons/fi";
// import logo from "../assets/Logo.png";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);
 

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "https://learn-earn-contest-2.onrender.com/api/v1/auth/register",
//         form
//       );

//       alert("Signup Successful ✅");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Something went wrong ❌");
//     } finally {
//       setLoading(false);
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

//           <h2 className="text-3xl font-bold leading-snug">
//             Learn. Compete. Grow.
//           </h2>

//           <p className="mt-4 text-sm opacity-90">
//             Join India's most advanced academic contest platform.
//           </p>

//           {/* FEATURES */}
//           <ul className="mt-6 space-y-4 text-sm">

//             <li className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
//               <FiTarget /> Real-world contests
//             </li>

//             <li className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
//               <FiTrendingUp /> Skill-based ranking system
//             </li>

//             <li className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
//               <FiAward /> Career growth opportunities
//             </li>

//           </ul>

//         </div>

//         {/* FOOTER */}
//         <p className="relative z-10 text-xs opacity-80">
//           © 2024 Desun Academy
//         </p>
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

//             <h2 className="text-2xl font-bold text-center">
//               Create Account
//             </h2>

//             <p className="text-center text-sm text-gray-500 mt-1">
//               Start your journey with us
//             </p>

//             <div className="mt-6 space-y-4">

//               <Input
//                 label="Full Name"
//                 name="name"
//                 placeholder="Enter name"
//                 value={form.name}
//                 onChange={handleChange}
//                 leftIcon={<FiUser />}
//               />

//               <Input
//                 label="Email"
//                 name="email"
//                 placeholder="Enter email"
//                 value={form.email}
//                 onChange={handleChange}
//                 leftIcon={<FiMail />}
//               />

//               <Input
//                 label="Password"
//                 name="password"
//                 type={showPass ? "text" : "password"}
//                 placeholder="Min 8 characters"
//                 value={form.password}
//                 onChange={handleChange}
//                 leftIcon={<FiLock />}
//                 rightIcon={
//                   <span onClick={() => setShowPass(!showPass)}>
//                     👁
//                   </span>
//                 }
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
//                 Already have an account?{" "}
//                 <Link to="/login" className="text-[#82c600] font-medium">
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
import { FiUser, FiMail, FiLock, FiTarget, FiTrendingUp, FiAward } from "react-icons/fi";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import logo from "../assets/Logo.png";
import { registerUser } from "../features/authSlice";
import { toast } from "react-toastify";


const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  // Get loading state from Redux
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
 
 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await dispatch(registerUser(form)).unwrap();

      toast.success("Signup Successful ✅");
      navigate("/login");
    } catch (err) {
      toast.error(err || "Something went wrong ❌");
    }
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* 🔥 LEFT SIDE PREMIUM */}
      <div className="hidden lg:flex flex-col justify-between p-10 relative overflow-hidden bg-gradient-to-br from-[#82c600] to-[#6aa800] text-white">
        {/* BACKGROUND GLOW */}
        <div className="absolute top-[-80px] right-[-80px] w-[250px] h-[250px] bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-80px] left-[-80px] w-[250px] h-[250px] bg-[#fbd300]/20 rounded-full blur-3xl"></div>

        {/* LOGO */}
        <div className="relative z-10">
          <img src={logo} alt="logo" className="w-24 mb-4" />
          <h1 className="text-2xl font-bold">DESUN ACADEMY</h1>
          <p className="text-sm opacity-90">Get Placed by Skills</p>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-sm">
          <h2 className="text-3xl font-bold leading-snug">Learn. Compete. Grow.</h2>
          <p className="mt-4 text-sm opacity-90">Join India's most advanced academic contest platform.</p>
          {/* FEATURES */}
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm"><FiTarget /> Real-world contests</li>
            <li className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm"><FiTrendingUp /> Skill-based ranking system</li>
            <li className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm"><FiAward /> Career growth opportunities</li>
          </ul>
        </div>

        {/* FOOTER */}
        <p className="relative z-10 text-xs opacity-80">© 2024 Desun Academy</p>
      </div>

      {/* 🔥 RIGHT SIDE FORM */}
      <div className="flex items-center justify-center px-6 py-10 bg-[#f6f7fb]">
        <div className="w-full max-w-md">
          {/* MOBILE LOGO */}
          <div className="text-center mb-6 lg:hidden">
            <img src={logo} alt="logo" className="mx-auto w-20" />
            <h1 className="font-bold mt-2">DESUN ACADEMY</h1>
          </div>

          {/* CARD */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-center">Create Account</h2>
            <p className="text-center text-sm text-gray-500 mt-1">Start your journey with us</p>

            <div className="mt-6 space-y-4">
              <Input label="Full Name" name="name" placeholder="Enter name" value={form.name} onChange={handleChange} leftIcon={<FiUser />} />
              <Input label="Email" name="email" placeholder="Enter email" value={form.email} onChange={handleChange} leftIcon={<FiMail />} />
              <Input 
                label="Password" 
                name="password" 
                type={showPass ? "text" : "password"} 
                placeholder="Min 8 characters" 
                value={form.password} 
                onChange={handleChange} 
                leftIcon={<FiLock />} 
                rightIcon={<span onClick={() => setShowPass(!showPass)} className="cursor-pointer">👁</span>} 
              />

              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>

              {/* DIVIDER */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-[1px] bg-gray-200"></div>
                <span className="text-xs text-gray-400">OR</span>
                <div className="flex-1 h-[1px] bg-gray-200"></div>
              </div>

              <Button variant="outline">
                <span className="text-[#fbd300] font-bold">G</span> Sign up with Google
              </Button>

              <p className="text-center text-sm">
                Already have an account? <Link to="/login" className="text-[#82c600] font-medium">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;