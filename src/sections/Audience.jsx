// import Container from "../components/Container";
// import Button from "../components/ui/Button";

// import {
//   GraduationCap,
//   Building2,
//   CheckCircle
// } from "lucide-react";

// const Audience = () => {
//   return (
//     <section className="py-24 bg-gradient-to-b from-white via-[#f8fafc] to-[#eef2f7]">
//       <Container>

//         {/* 🔥 HEADER */}
//         <div className="text-center max-w-2xl mx-auto mb-14">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
//             Who is this{" "}
//             <span className="bg-gradient-to-r from-[#82C600] to-[#a3e635] bg-clip-text text-transparent">
//               for?
//             </span>
//           </h2>
//           <p className="text-gray-500 mt-4">
//             Whether you're a student or an institution, we’ve got something powerful for you 🚀
//           </p>
//         </div>

//         {/* 🔥 GRID */}
//         <div className="grid lg:grid-cols-2 gap-10">

//           {/* 🎓 STUDENT CARD */}
//           <div className="relative group rounded-3xl p-8 bg-white/70 backdrop-blur-xl border border-white/20 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">

//             {/* GLOW */}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#82c600]/10 to-[#a3e635]/10 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"></div>

//             {/* ICON */}
//             <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#82c600]/10 text-[#82c600]">
//               <GraduationCap size={28} />
//             </div>

//             {/* TITLE */}
//             <h3 className="text-2xl font-semibold mt-5 text-gray-800 group-hover:text-[#82c600] transition">
//               For Students
//             </h3>

//             {/* DESC */}
//             <p className="text-gray-500 text-sm mt-3">
//               Build your academic profile, compete in contests, and showcase your skills globally.
//             </p>

//             {/* LIST */}
//             <ul className="mt-6 space-y-3 text-sm text-gray-700">
//               <li className="flex items-center gap-2">
//                 <CheckCircle size={16} className="text-[#82c600]" />
//                 Personalized Dashboards
//               </li>
//               <li className="flex items-center gap-2">
//                 <CheckCircle size={16} className="text-[#82c600]" />
//                 Build Academic Portfolio
//               </li>
//               <li className="flex items-center gap-2">
//                 <CheckCircle size={16} className="text-[#82c600]" />
//                 Learning Resources
//               </li>
//             </ul>

//             {/* BUTTON */}
//             <Button
//               full
//               className="mt-8 bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white"
//             >
//               Join as Student
//             </Button>

//           </div>

//           {/* 🏫 ADMIN CARD */}
//           <div className="relative group rounded-3xl p-8 bg-white/70 backdrop-blur-xl border border-white/20 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">

//             {/* GLOW */}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#a3e635]/10 to-[#82c600]/10 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"></div>

//             {/* ICON */}
//             <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#82c600]/10 text-[#82c600]">
//               <Building2 size={28} />
//             </div>

//             {/* TITLE */}
//             <h3 className="text-2xl font-semibold mt-5 text-gray-800 group-hover:text-[#82c600] transition">
//               For Institutions
//             </h3>

//             {/* DESC */}
//             <p className="text-gray-500 text-sm mt-3">
//               Manage students, host contests, and track performance with powerful tools.
//             </p>

//             {/* LIST */}
//             <ul className="mt-6 space-y-3 text-sm text-gray-700">
//               <li className="flex items-center gap-2">
//                 <CheckCircle size={16} className="text-[#82c600]" />
//                 Bulk Student Management
//               </li>
//               <li className="flex items-center gap-2">
//                 <CheckCircle size={16} className="text-[#82c600]" />
//                 Custom Contest Hosting
//               </li>
//               <li className="flex items-center gap-2">
//                 <CheckCircle size={16} className="text-[#82c600]" />
//                 Analytics Dashboard
//               </li>
//             </ul>

//             {/* BUTTON */}
//             <Button
//               full
//               className="mt-8 bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white"
//             >
//               Request Access
//             </Button>

//           </div>

//         </div>

//       </Container>
//     </section>
//   );
// };

// export default Audience;

import Container from "../components/Container";
import Button from "../components/ui/Button";

import {
  GraduationCap,
  Building2,
  CheckCircle
} from "lucide-react";

const Audience = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-[#f8fafc] to-[#eef2f7]">
      <Container>

        {/* 🔥 HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Who is this{" "}
            <span className="bg-gradient-to-r from-[#82C600] via-[#a3e635] to-[#fbd300] bg-clip-text text-transparent">
              for?
            </span>
          </h2>

          <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg leading-relaxed">
            Whether you're a{" "}
            <span className="font-semibold text-gray-800">student</span> or an{" "}
            <span className="font-semibold text-gray-800">institution</span>, we’ve got something{" "}
            <span className="bg-gradient-to-r from-[#82c600] to-[#a3e635] bg-clip-text text-transparent font-semibold">
              powerful
            </span>{" "}
            for you 🚀
          </p>
        </div>

        {/* 🔥 GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">

          {/* 🎓 STUDENT CARD */}
          <div className="relative group rounded-3xl p-6 sm:p-8 
          bg-gradient-to-br from-white via-[#f6ffe8] to-[#ecfccb]
          border border-[#82c600]/20 
          shadow-md hover:shadow-[0_10px_40px_rgba(130,198,0,0.25)]
          transition-all duration-500 hover:-translate-y-2 overflow-hidden">

            {/* GLOW */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#82c600]/10 to-[#a3e635]/10 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"></div>

            {/* ICON */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl 
            bg-gradient-to-br from-[#82c600]/20 to-[#a3e635]/20 text-[#82c600] 
            group-hover:scale-110 transition duration-300">
              <GraduationCap size={26} />
            </div>

            {/* TITLE */}
            <h3 className="text-xl sm:text-2xl font-semibold mt-5 
            bg-gradient-to-r from-[#82c600] to-[#a3e635] bg-clip-text text-transparent">
              For Students
            </h3>

            {/* DESC */}
            <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
              Build your{" "}
              <span className="font-medium text-gray-800">academic profile</span>, compete in contests, and showcase your skills{" "}
              <span className="text-[#82c600] font-medium">globally</span>.
            </p>

            {/* LIST */}
            <ul className="mt-6 space-y-3 text-sm sm:text-base text-gray-700">
              {[
                "Personalized Dashboards",
                "Build Academic Portfolio",
                "Learning Resources"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-[#82c600]" />
                  {item}
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <Button
              full
              className="mt-8 
              bg-gradient-to-r from-[#82c600] via-[#a3e635] to-[#fbd300] 
              text-white shadow-md hover:shadow-lg 
              hover:scale-[1.03] active:scale-95 transition-all duration-300"
            >
              Join as Student
            </Button>

          </div>

          {/* 🏫 INSTITUTION CARD */}
          <div className="relative group rounded-3xl p-6 sm:p-8 
          bg-gradient-to-br from-white via-[#f6ffe8] to-[#ecfccb]
          border border-[#82c600]/20 
          shadow-md hover:shadow-[0_10px_40px_rgba(130,198,0,0.25)]
          transition-all duration-500 hover:-translate-y-2 overflow-hidden">

            {/* GLOW */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#a3e635]/10 to-[#82c600]/10 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"></div>

            {/* ICON */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl 
            bg-gradient-to-br from-[#82c600]/20 to-[#a3e635]/20 text-[#82c600]
            group-hover:scale-110 transition duration-300">
              <Building2 size={26} />
            </div>

            {/* TITLE */}
            <h3 className="text-xl sm:text-2xl font-semibold mt-5 
            bg-gradient-to-r from-[#82c600] to-[#a3e635] bg-clip-text text-transparent">
              For Institutions
            </h3>

            {/* DESC */}
            <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
              Manage{" "}
              <span className="font-medium text-gray-800">students</span>, host contests, and track performance with{" "}
              <span className="text-[#82c600] font-medium">powerful tools</span>.
            </p>

            {/* LIST */}
            <ul className="mt-6 space-y-3 text-sm sm:text-base text-gray-700">
              {[
                "Bulk Student Management",
                "Custom Contest Hosting",
                "Analytics Dashboard"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-[#82c600]" />
                  {item}
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <Button
              full
              className="mt-8 
              bg-gradient-to-r from-[#82c600] via-[#a3e635] to-[#fbd300] 
              text-white shadow-md hover:shadow-lg 
              hover:scale-[1.03] active:scale-95 transition-all duration-300"
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