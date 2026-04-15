

// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaGithub, FaGlobe, FaUsers } from "react-icons/fa";

// const SubmissionPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");

//   const [form, setForm] = useState({
//     projectTitle: "",
//     githubLink: "",
//     liveUrl: "",
//     description: "",
//     teamId: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     const cleanId = id?.trim();

//     console.log("PARAM ID FROM URL:", id);
//     console.log("CLEAN ID:", cleanId);

//     // ✅ Validate Contest ID
//     if (!cleanId || cleanId.length !== 24) {
//       alert("Invalid Contest ID ❌");
//       return;
//     }

//     // ✅ Required fields
//     if (!form.projectTitle || !form.githubLink) {
//       alert("Please fill required fields ❌");
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         contestId: cleanId, // ✅ FIXED HERE
//         projectTitle: form.projectTitle,
//         githubLink: form.githubLink,
//         liveUrl: form.liveUrl,
//         description: form.description,
//       };

//       // ✅ Team or Solo
//       if (form.teamId) {
//         payload.team = form.teamId;
//       } else {
//         payload.user = userId;
//       }

//       console.log("FINAL PAYLOAD:", payload);

//       const res = await axios.post(
//         "https://learn-earn-contest-3.onrender.com/api/v1/submission",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("✅ " + res.data.message);

//       navigate("/student/my-contests");
//     } catch (err) {
//       console.error("ERROR:", err.response?.data || err.message);

//       alert(err.response?.data?.message || "Submission failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] flex items-center justify-center p-6">
//       <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 border">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           🚀 Submit Your Project
//         </h2>

//         <div className="space-y-5">
//           <input
//             name="projectTitle"
//             placeholder="Project Title"
//             value={form.projectTitle}
//             onChange={handleChange}
//             className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#82C600]"
//           />

//           <div className="flex items-center border rounded-lg px-3">
//             <FaGithub className="text-gray-400" />
//             <input
//               name="githubLink"
//               placeholder="GitHub Repository Link"
//               value={form.githubLink}
//               onChange={handleChange}
//               className="w-full px-3 py-2 outline-none"
//             />
//           </div>

//           <div className="flex items-center border rounded-lg px-3">
//             <FaGlobe className="text-gray-400" />
//             <input
//               name="liveUrl"
//               placeholder="Live Project URL"
//               value={form.liveUrl}
//               onChange={handleChange}
//               className="w-full px-3 py-2 outline-none"
//             />
//           </div>

//           <div className="flex items-center border rounded-lg px-3">
//             <FaUsers className="text-gray-400" />
//             <input
//               name="teamId"
//               placeholder="Team ID (optional)"
//               value={form.teamId}
//               onChange={handleChange}
//               className="w-full px-3 py-2 outline-none"
//             />
//           </div>

//           <textarea
//             name="description"
//             placeholder="Project Description"
//             value={form.description}
//             onChange={handleChange}
//             className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#82C600]"
//             rows={4}
//           />

//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full bg-[#82C600] text-white py-2 rounded-lg hover:bg-[#6fa800] transition"
//           >
//             {loading ? "Submitting..." : "Submit Project"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubmissionPage;


// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// import {
//   FaGithub,
//   FaGlobe,
//   FaUsers,
//   FaProjectDiagram,
//   FaFileAlt,
// } from "react-icons/fa";

// import { FiSend } from "react-icons/fi";

// const SubmissionPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");

//   const [form, setForm] = useState({
//     projectTitle: "",
//     githubLink: "",
//     liveUrl: "",
//     description: "",
//     teamId: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     const cleanId = id?.trim();

//     if (!cleanId || cleanId.length !== 24) {
//       alert("Invalid Contest ID ❌");
//       return;
//     }

//     if (!form.projectTitle || !form.githubLink) {
//       alert("Please fill required fields ❌");
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         contestId: cleanId,
//         projectTitle: form.projectTitle,
//         githubLink: form.githubLink,
//         liveUrl: form.liveUrl,
//         description: form.description,
//       };

//       if (form.teamId) payload.team = form.teamId;
//       else payload.user = userId;

//       const res = await axios.post(
//         "https://learn-earn-contest-3.onrender.com/api/v1/submission",
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("✅ " + res.data.message);
//       navigate("/student/my-contests");
//     } catch (err) {
//       alert(err.response?.data?.message || "Submission failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f1f5f9] via-white to-[#ecfdf5] flex items-center justify-center p-6">

//       <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-gray-100">

//         {/* HEADER */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
//             🚀 Submit Your Project
//           </h2>
//           <div className="w-16 h-1 bg-gradient-to-r from-[#82C600] to-[#6ea800] rounded-full mt-3"></div>
//         </div>

//         <div className="space-y-6">

//           {/* PROJECT TITLE */}
//           <div>
//             <label className="text-xs text-gray-400 mb-1 block flex items-center gap-2">
//               <FaProjectDiagram /> Project Title
//             </label>
//             <input
//               name="projectTitle"
//               value={form.projectTitle}
//               onChange={handleChange}
//               placeholder="Enter your project name"
//               className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#82C600] transition"
//             />
//           </div>

//           {/* GITHUB */}
//           <div>
//             <label className="text-xs text-gray-400 mb-1 block flex items-center gap-2">
//               <FaGithub /> GitHub Repository
//             </label>
//             <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#82C600]">
//               <FaGithub className="text-gray-400" />
//               <input
//                 name="githubLink"
//                 value={form.githubLink}
//                 onChange={handleChange}
//                 placeholder="https://github.com/..."
//                 className="w-full outline-none bg-transparent"
//               />
//             </div>
//           </div>

//           {/* LIVE */}
//           <div>
//             <label className="text-xs text-gray-400 mb-1 block flex items-center gap-2">
//               <FaGlobe /> Live URL
//             </label>
//             <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#82C600]">
//               <FaGlobe className="text-gray-400" />
//               <input
//                 name="liveUrl"
//                 value={form.liveUrl}
//                 onChange={handleChange}
//                 placeholder="https://your-app.com"
//                 className="w-full outline-none bg-transparent"
//               />
//             </div>
//           </div>

//           {/* TEAM */}
//           <div>
//             <label className="text-xs text-gray-400 mb-1 block flex items-center gap-2">
//               <FaUsers /> Team ID (optional)
//             </label>
//             <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#82C600]">
//               <FaUsers className="text-gray-400" />
//               <input
//                 name="teamId"
//                 value={form.teamId}
//                 onChange={handleChange}
//                 placeholder="Enter team ID"
//                 className="w-full outline-none bg-transparent"
//               />
//             </div>
//           </div>

//           {/* DESCRIPTION */}
//           <div>
//             <label className="text-xs text-gray-400 mb-1 block flex items-center gap-2">
//               <FaFileAlt /> Description
//             </label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               rows={4}
//               placeholder="Explain your project..."
//               className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#82C600] transition"
//             />
//           </div>

//           {/* BUTTON */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-[#82C600] to-[#6ea800] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition flex items-center justify-center gap-2"
//           >
//             <FiSend />
//             {loading ? "Submitting..." : "Submit Project"}
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubmissionPage;




import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../services/axios"; // ✅ using your API
import AlertModal from "@/components/ui/AlertModal";
import useAlertModal from "@/hooks/useAlertModal";

import {
  FaGithub,
  FaGlobe,
  FaUsers,
  FaProjectDiagram,
  FaFileAlt,
} from "react-icons/fa";

import { FiSend } from "react-icons/fi";

const SubmissionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    projectTitle: "",
    githubLink: "",
    liveUrl: "",
    description: "",
    teamId: "",
  });

  const [loading, setLoading] = useState(false);
  const { alertState, showAlert, closeAlert } = useAlertModal();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const cleanId = id?.trim();

    if (!cleanId || cleanId.length !== 24) {
      showAlert({
        message: "Invalid contest ID.",
        variant: "error",
      });
      return;
    }

    if (!form.githubLink) {
      showAlert({
        message: "GitHub link is required.",
        variant: "warning",
      });
      return;
    }

    try {
      setLoading(true);

      // ✅ ONLY REQUIRED BODY (NO EXTRA FIELDS)
      const payload = {
        contestId: cleanId,
        githubLink: form.githubLink,
        liveUrl: form.liveUrl,
      };

      const res = await API.post("/submission/submit", payload);

      showAlert({
        message: res.data.message || "Submission completed successfully.",
        variant: "success",
        onClose: () => navigate("/student/my-contests"),
      });
    } catch (err) {
      showAlert({
        message: err.response?.data?.message || "Submission failed.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f1f5f9] via-white to-[#ecfdf5] p-4 sm:p-6">

      <div className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-8">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 sm:text-2xl">
            🚀 Submit Your Project
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#82C600] to-[#6ea800] rounded-full mt-3"></div>
        </div>

        <div className="space-y-5 sm:space-y-6">

          {/* PROJECT TITLE */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block flex items-center gap-2">
              <FaProjectDiagram /> Project Title
            </label>
            <input
              name="projectTitle"
              value={form.projectTitle}
              onChange={handleChange}
              placeholder="Enter your project name"
              className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#82C600] transition"
            />
          </div>

          {/* GITHUB */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block flex items-center gap-2">
              <FaGithub /> GitHub Repository
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#82C600]">
              <FaGithub className="text-gray-400" />
              <input
                name="githubLink"
                value={form.githubLink}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* LIVE */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block flex items-center gap-2">
              <FaGlobe /> Live URL
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#82C600]">
              <FaGlobe className="text-gray-400" />
              <input
                name="liveUrl"
                value={form.liveUrl}
                onChange={handleChange}
                placeholder="https://your-app.com"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* TEAM */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block flex items-center gap-2">
              <FaUsers /> Team Name (optional)
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#82C600]">
              <FaUsers className="text-gray-400" />
              <input
                name="teamId"
                value={form.teamId}
                onChange={handleChange}
                placeholder="Enter Team Name"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block flex items-center gap-2">
              <FaFileAlt /> Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Explain your project..."
              className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#82C600] transition"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#82C600] to-[#6ea800] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition flex items-center justify-center gap-2"
          >
            <FiSend />
            {loading ? "Submitting..." : "Submit Project"}
          </button>

      </div>

        </div>
      </div>

      <AlertModal {...alertState} onClose={closeAlert} />
    </>
  );
};

export default SubmissionPage;
