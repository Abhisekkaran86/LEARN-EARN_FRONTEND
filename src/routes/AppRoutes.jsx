import { Routes, Route } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";

import HomePage from "@/features/home/pages/HomePage";
import AboutPage from "@/features/home/pages/AboutPage";
import ContactPage from "@/features/home/pages/ContactPage";

import ContestsPage from "@/features/contest/pages/ContestsPage";
import ContestDetailsPage from "@/features/contest/pages/ContestDetailsPage";

import MainLayout from "@/components/layout/MainLayout";
import AdminRoutes from "@/routes/AdminRoutes";
import StudentRoutes from "@/routes/StudentRoutes";
import ApprovalPage from "../features/admin/components/AdminApproval";
import TeamInviteConfirmPage from "../features/student/pages/TeamInviteConfirmPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contests" element={<ContestsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contest/:id" element={<ContestDetailsPage />} />
      </Route>

      {/* Auth */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route
        path="/invite/confirm/:token"
        element={<TeamInviteConfirmPage />}
      />
      <Route
        path="/student/invite/confirm/:token"
        element={<TeamInviteConfirmPage />}
      />
      {/* ADMIN */}
      <Route path="/admin/requests" element={<ApprovalPage />} />

      {/* Admin + Student */}
      {AdminRoutes()}
      {StudentRoutes()}
    </Routes>
  );
};

export default AppRoutes;
