// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const SubmissionPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     projectTitle: "",
//     githubLink: "",
//     liveLink: "",
//     description: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     if (!form.projectTitle || !form.githubLink) {
//       alert("Fill required fields ❌");
//       return;
//     }

//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       const res = await axios.post(
//         "https://learn-earn-contest-2.onrender.com/api/v1/submissions",
//         {
//           contest: id,
//           projectTitle: form.projectTitle,
//           githubLink: form.githubLink,
//           liveLink: form.liveLink,
//           description: form.description,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert(res.data?.message || "Submitted successfully 🎉");

//       navigate("/student/my-contests");

//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert(err.response?.data?.message || "Submission failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#ecfdf5] p-6">

//       <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">

//         <h2 className="text-xl font-semibold mb-4 text-center">
//           🚀 Submit Project
//         </h2>

//         <div className="space-y-4">

//           <input
//             name="projectTitle"
//             placeholder="Project Title"
//             value={form.projectTitle}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded-lg"
//           />

//           <input
//             name="githubLink"
//             placeholder="GitHub Link"
//             value={form.githubLink}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded-lg"
//           />

//           <input
//             name="liveLink"
//             placeholder="Live Project Link"
//             value={form.liveLink}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded-lg"
//           />

//           <textarea
//             name="description"
//             placeholder="Project Description"
//             value={form.description}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded-lg"
//           />

//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full bg-[#82C600] text-white py-2 rounded-lg hover:bg-[#6fa800]"
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
// import { FaGithub, FaGlobe, FaUsers } from "react-icons/fa";

// const SubmissionPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // ✅ GET FROM LOCAL STORAGE
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
//     if (!form.projectTitle || !form.githubLink) {
//       alert("Please fill required fields ❌");
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         contest: id,
//         projectTitle: form.projectTitle,
//         githubLink: form.githubLink,
//         liveUrl: form.liveUrl,
//         description: form.description,
//       };

//       // ✅ TEAM OR SOLO LOGIC
//       if (form.teamId) {
//         payload.team = form.teamId;
//       } else {
//         payload.user = userId;
//       }

//       const res = await axios.post(
//         "https://learn-earn-contest-2.onrender.com/api/v1/submission",
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
//       console.error(err.response?.data || err.message);
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

//           {/* TITLE */}
//           <input
//             name="projectTitle"
//             placeholder="Project Title"
//             value={form.projectTitle}
//             onChange={handleChange}
//             className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#82C600]"
//           />

//           {/* GITHUB */}
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

//           {/* LIVE */}
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

//           {/* TEAM ID */}
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

//           {/* DESCRIPTION */}
//           <textarea
//             name="description"
//             placeholder="Project Description"
//             value={form.description}
//             onChange={handleChange}
//             className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#82C600]"
//             rows={4}
//           />

//           {/* BUTTON */}
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

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGithub, FaGlobe, FaUsers } from "react-icons/fa";

const SubmissionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    projectTitle: "",
    githubLink: "",
    liveUrl: "",
    description: "",
    teamId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const cleanId = id?.trim();

    console.log("PARAM ID FROM URL:", id);
    console.log("CLEAN ID:", cleanId);

    // ✅ Validate Contest ID
    if (!cleanId || cleanId.length !== 24) {
      alert("Invalid Contest ID ❌");
      return;
    }

    // ✅ Required fields
    if (!form.projectTitle || !form.githubLink) {
      alert("Please fill required fields ❌");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        contestId: cleanId, // ✅ FIXED HERE
        projectTitle: form.projectTitle,
        githubLink: form.githubLink,
        liveUrl: form.liveUrl,
        description: form.description,
      };

      // ✅ Team or Solo
      if (form.teamId) {
        payload.team = form.teamId;
      } else {
        payload.user = userId;
      }

      console.log("FINAL PAYLOAD:", payload);

      const res = await axios.post(
        "https://learn-earn-contest-2.onrender.com/api/v1/submission",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ " + res.data.message);

      navigate("/student/my-contests");
    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);

      alert(err.response?.data?.message || "Submission failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 border">
        <h2 className="text-2xl font-bold text-center mb-6">
          🚀 Submit Your Project
        </h2>

        <div className="space-y-5">
          <input
            name="projectTitle"
            placeholder="Project Title"
            value={form.projectTitle}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#82C600]"
          />

          <div className="flex items-center border rounded-lg px-3">
            <FaGithub className="text-gray-400" />
            <input
              name="githubLink"
              placeholder="GitHub Repository Link"
              value={form.githubLink}
              onChange={handleChange}
              className="w-full px-3 py-2 outline-none"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3">
            <FaGlobe className="text-gray-400" />
            <input
              name="liveUrl"
              placeholder="Live Project URL"
              value={form.liveUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 outline-none"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3">
            <FaUsers className="text-gray-400" />
            <input
              name="teamId"
              placeholder="Team ID (optional)"
              value={form.teamId}
              onChange={handleChange}
              className="w-full px-3 py-2 outline-none"
            />
          </div>

          <textarea
            name="description"
            placeholder="Project Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#82C600]"
            rows={4}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#82C600] text-white py-2 rounded-lg hover:bg-[#6fa800] transition"
          >
            {loading ? "Submitting..." : "Submit Project"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionPage;