// pages/Signup.jsx
import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Signup = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
    });

    const [showPass, setShowPass] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">

            {/* LEFT SIDE (🔥 BRANDING) */}
            <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-[#82c600] to-[#6aa800] text-white">

                {/* LOGO */}
                <div>
                    <img src={logo} alt="logo" className="w-24 mb-4" />
                    <h1 className="text-2xl font-bold">DESUN ACADEMY</h1>
                    <p className="text-sm opacity-90">Get Placed by Skills</p>
                </div>

                {/* CONTENT */}
                <div className="max-w-sm">
                    <h2 className="text-3xl font-bold leading-snug">
                        Learn. Compete. Grow.
                    </h2>

                    <p className="mt-4 text-sm opacity-90">
                        Join India's most advanced academic contest platform.
                        Build your skills, showcase your talent, and get real-world recognition.
                    </p>

                    {/* FEATURE LIST */}
                    <ul className="mt-6 space-y-3 text-sm">
                        <li>✔ Real-world contests</li>
                        <li>✔ Skill-based ranking system</li>
                        <li>✔ Career growth opportunities</li>
                    </ul>
                </div>

                {/* FOOTER */}
                <p className="text-xs opacity-80">
                    © 2024 Desun Academy
                </p>
            </div>

            {/* RIGHT SIDE (FORM) */}
            <div className="flex items-center justify-center px-6 py-10 bg-[#f6f7fb]">

                <div className="w-full max-w-md">

                    {/* MOBILE LOGO */}
                    <div className="text-center mb-6 lg:hidden">
                        <img src={logo} alt="logo" className="mx-auto w-20" />
                        <h1 className="font-bold mt-2">DESUN ACADEMY</h1>
                    </div>

                    {/* CARD */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl">

                        <h2 className="text-2xl font-bold text-center">
                            Create Account
                        </h2>

                        <p className="text-center text-sm text-gray-500 mt-1">
                            Start your journey with us
                        </p>

                        <div className="mt-6 space-y-4">

                            <Input
                                label="Full Name"
                                name="name"
                                placeholder="Enter name"
                                value={form.name}
                                onChange={handleChange}
                                leftIcon={<FiUser />}
                            />

                            <Input
                                label="Email"
                                name="email"
                                placeholder="Enter email"
                                value={form.email}
                                onChange={handleChange}
                                leftIcon={<FiMail />}
                            />

                            <Input
                                label="Password"
                                name="password"
                                type={showPass ? "text" : "password"}
                                placeholder="Min 8 characters"
                                value={form.password}
                                onChange={handleChange}
                                leftIcon={<FiLock />}
                                rightIcon={
                                    <span onClick={() => setShowPass(!showPass)}>
                                        👁
                                    </span>
                                }
                            />

                            <Input
                                label="Mobile"
                                name="phone"
                                placeholder="Enter number"
                                value={form.phone}
                                onChange={handleChange}
                                leftIcon={<FiPhone />}
                            />

                            {/* GENDER */}
                            <div>
                                <p className="text-sm text-gray-600">Gender</p>
                                <div className="flex gap-4 mt-2">
                                    {["Male", "Female", "Other"].map((g) => (
                                        <label key={g} className="flex items-center gap-2 text-sm">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={g}
                                                onChange={handleChange}
                                                className="accent-[#82c600]"
                                            />
                                            {g}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <Button>Create Account</Button>

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
                                Already have an account?{" "}
                                <Link to="/login" className="text-[#82c600] font-medium">
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