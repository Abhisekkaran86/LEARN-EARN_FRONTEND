
// import { useState } from "react";
// import Input from "../components/ui/Input";
// import Button from "../components/ui/Button";
// import { FiMail, FiLock } from "react-icons/fi";
// import logo from "../assets/Logo.png";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";


// const Login = () => {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPass, setShowPass] = useState(false);
//   const navigate = useNavigate();
  

 
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
//   const [loading, setLoading] = useState(false);

// const handleLogin  = async () => {
//   try {
//     setLoading(true);

//     const res = await axios.post(
//       "https://learn-earn-contest-2.onrender.com/api/v1/auth/login",
//       form
//     );

//     Cookies.set("token", res.data.token, {
//       expires: 7,
//     });

//     alert("Signup Successful ✅");
//     navigate("/home");

//   } catch (err) {
//     alert(err.response?.data?.message || "Something went wrong ❌");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#eef2f7] px-4">

//       <div className="w-full max-w-md">

//         {/* LOGO */}
//         <div className="text-center mb-8">
//           <img src={logo} alt="logo" className="mx-auto w-20" />
//           <h1 className="font-bold text-lg mt-2 tracking-wide">
//             DESUN ACADEMY
//           </h1>
//           <p className="text-sm text-gray-500">
//             Get Placed by Skills
//           </p>
//         </div>

//         {/* CARD */}
//         <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">

//           <h2 className="text-2xl font-semibold text-center">
//             Welcome Back 👋
//           </h2>

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
//                 <input
//                   type="checkbox"
//                   className="accent-[#82c600]"
//                 />
//                 Remember me
//               </label>

//               <span className="text-[#82c600] cursor-pointer hover:underline">
//                 Forgot password?
//               </span>
//             </div>

//             {/* LOGIN BUTTON */}
//             <Button onClick={handleLogin} size="md">Login</Button>

//             {/* DIVIDER */}
//             <div className="flex items-center gap-3">
//               <div className="flex-1 h-[1px] bg-gray-200"></div>
//               <span className="text-xs text-gray-400">OR</span>
//               <div className="flex-1 h-[1px] bg-gray-200"></div>
//             </div>

//             {/* GOOGLE */}
//             <Button variant="outline">
//               <span className="text-[#fbd300] font-bold text-lg">G</span>
//               Continue with Google
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


import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import logo from "../assets/Logo.png";
import { loginUser } from "../features/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get loading state from Redux
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      // dispatch the thunk and unwrap to catch errors locally
      await dispatch(loginUser(form)).unwrap();

      alert("Login Successful ✅");
      navigate("/");
    } catch (err) {
      // err will be the custom message from rejectWithValue
      alert(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#eef2f7] px-4">
      <div className="w-full max-w-md">
        {/* LOGO */}
        <div className="text-center mb-8">
          <img src={logo} alt="logo" className="mx-auto w-20" />
          <h1 className="font-bold text-lg mt-2 tracking-wide">DESUN ACADEMY</h1>
          <p className="text-sm text-gray-500">Get Placed by Skills</p>
        </div>

        {/* CARD */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-semibold text-center">Welcome Back 👋</h2>
          <p className="text-center text-gray-500 text-sm mt-1">Login to your account</p>

          <div className="mt-6 space-y-5">
            <Input label="Email Address" name="email" placeholder="name@email.com" value={form.email} onChange={handleChange} leftIcon={<FiMail />} />
            
            <Input 
              label="Password" 
              name="password" 
              type={showPass ? "text" : "password"} 
              placeholder="Enter your password" 
              value={form.password} 
              onChange={handleChange} 
              leftIcon={<FiLock />} 
              rightIcon={<span onClick={() => setShowPass(!showPass)} className="cursor-pointer text-gray-400 hover:text-black">👁</span>} 
            />

            {/* REMEMBER + FORGOT */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-[#82c600]" /> Remember me
              </label>
              <span className="text-[#82c600] cursor-pointer hover:underline">Forgot password?</span>
            </div>

            {/* LOGIN BUTTON */}
            <Button onClick={handleLogin} size="md" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-[1px] bg-gray-200"></div>
              <span className="text-xs text-gray-400">OR</span>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            {/* GOOGLE */}
            <Button variant="outline">
              <span className="text-[#fbd300] font-bold text-lg">G</span> Continue with Google
            </Button>

            {/* REGISTER */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account? <Link to="/signup" className="text-[#82c600] font-medium hover:underline">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;