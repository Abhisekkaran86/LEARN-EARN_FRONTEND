import { useNavigate } from "react-router-dom";
import LoginView from "../view/LoginView";

const LoginContainer = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    // 🔥 Replace with real API
    let response;

    if (
      formData.email === "admin@gmail.com" &&
      formData.password === "1234"
    ) {
      response = {
        token: "admin_token",
        role: "admin",
      };
    } else if (
      formData.email === "student@gmail.com" &&
      formData.password === "1234"
    ) {
      response = {
        token: "student_token",
        role: "student",
      };
    } else {
      alert("Invalid credentials");
      return;
    }

    // ✅ Save in localStorage
    localStorage.setItem("token", response.token);
    localStorage.setItem("role", response.role);

    // 🔥 Redirect based on role
    if (response.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  };

  return <LoginView onLogin={handleLogin} />;
};

export default LoginContainer;