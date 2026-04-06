import Container from "../components/Container";
import Button from "../components/ui/Button";

import {
  GraduationCap,
  Building2,
  CheckCircle
} from "lucide-react";

const Audience = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#f8fafc] to-[#eef2f7]">
      <Container>

        {/* 🔥 HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Who is this{" "}
            <span className="bg-gradient-to-r from-[#82C600] to-[#a3e635] bg-clip-text text-transparent">
              for?
            </span>
          </h2>
          <p className="text-gray-500 mt-4">
            Whether you're a student or an institution, we’ve got something powerful for you 🚀
          </p>
        </div>

        {/* 🔥 GRID */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* 🎓 STUDENT CARD */}
          <div className="relative group rounded-3xl p-8 bg-white/70 backdrop-blur-xl border border-white/20 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">

            {/* GLOW */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#82c600]/10 to-[#a3e635]/10 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"></div>

            {/* ICON */}
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#82c600]/10 text-[#82c600]">
              <GraduationCap size={28} />
            </div>

            {/* TITLE */}
            <h3 className="text-2xl font-semibold mt-5 text-gray-800 group-hover:text-[#82c600] transition">
              For Students
            </h3>

            {/* DESC */}
            <p className="text-gray-500 text-sm mt-3">
              Build your academic profile, compete in contests, and showcase your skills globally.
            </p>

            {/* LIST */}
            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#82c600]" />
                Personalized Dashboards
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#82c600]" />
                Build Academic Portfolio
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#82c600]" />
                Learning Resources
              </li>
            </ul>

            {/* BUTTON */}
            <Button
              full
              className="mt-8 bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white"
            >
              Join as Student
            </Button>

          </div>

          {/* 🏫 ADMIN CARD */}
          <div className="relative group rounded-3xl p-8 bg-white/70 backdrop-blur-xl border border-white/20 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">

            {/* GLOW */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#a3e635]/10 to-[#82c600]/10 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"></div>

            {/* ICON */}
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#82c600]/10 text-[#82c600]">
              <Building2 size={28} />
            </div>

            {/* TITLE */}
            <h3 className="text-2xl font-semibold mt-5 text-gray-800 group-hover:text-[#82c600] transition">
              For Institutions
            </h3>

            {/* DESC */}
            <p className="text-gray-500 text-sm mt-3">
              Manage students, host contests, and track performance with powerful tools.
            </p>

            {/* LIST */}
            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#82c600]" />
                Bulk Student Management
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#82c600]" />
                Custom Contest Hosting
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#82c600]" />
                Analytics Dashboard
              </li>
            </ul>

            {/* BUTTON */}
            <Button
              full
              className="mt-8 bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white"
            >
              Request Access
            </Button>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default Audience;