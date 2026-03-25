import logo from "../../assets/Logo.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#82c600]/10 to-[#fbd300]/20 px-4">

      {/* Logo */}
      <div className="text-center mb-6">
        <img src={logo} alt="logo" className="w-28 mx-auto" />
        <h1 className="text-2xl font-bold mt-2">DESUN ACADEMY</h1>
        <p className="bg-[#fbd300] inline-block px-3 py-1 rounded-md mt-2 font-semibold">
          Get Placed by Skills
        </p>
      </div>

      {children}
    </div>
  );
};

export default AuthLayout;