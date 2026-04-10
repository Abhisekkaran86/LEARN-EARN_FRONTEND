// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const AdminEvaluationPage = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const contest = state?.contest;
//   const student = state?.student;

//   const handleDeclareWinner = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "https://learn-earn-contest-2.onrender.com/api/v1/admin/declare-winner",
//         {
//           contestId: contest._id,
//           studentId: student._id,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("🏆 Winner Declared!");
//       navigate("/admin/dashboard");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!contest || !student) {
//     return (
//       <div className="flex items-center justify-center h-screen text-red-500 text-lg">
//         No Data Found
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-lime-100 p-6">

//       {/* HEADER */}
//       <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             🎯 Evaluation Panel
//           </h1>
//           <p className="text-gray-500 mt-1">
//             Review submission & declare winner
//           </p>
//         </div>

//         <button
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100"
//         >
//           ← Back
//         </button>
//       </div>

//       {/* MAIN GRID */}
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

//         {/* CONTEST CARD */}
//         <div className="bg-white/80 backdrop-blur-lg border rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold text-gray-800">
//               Contest Info
//             </h2>

//             <span className="px-3 py-1 text-xs rounded-full bg-lime-100 text-lime-700">
//               {contest.status}
//             </span>
//           </div>

//           <h3 className="text-xl font-bold text-gray-800 mb-2">
//             {contest.title}
//           </h3>

//           <p className="text-gray-500 text-sm mb-4">
//             {contest.description}
//           </p>

//           <div className="space-y-2 text-sm text-gray-600">
//             <p>📅 Deadline: {new Date(contest.deadline).toLocaleDateString()}</p>
//             <p>👥 Submissions: {contest.totalSubmittedStudents}</p>
//           </div>

//           {/* reward badge */}
//           <div className="mt-4 bg-lime-50 p-3 rounded-lg text-lime-700 text-sm font-medium">
//             🏆 {contest.rewards?.[0]}
//           </div>
//         </div>

//         {/* STUDENT CARD */}
//         <div className="bg-white/80 backdrop-blur-lg border rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

//           <h2 className="text-lg font-semibold text-gray-800 mb-4">
//             Candidate
//           </h2>

//           {/* profile */}
//           <div className="flex items-center gap-4 mb-4">
//             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-lime-400 to-lime-600 text-white flex items-center justify-center font-bold text-lg shadow">
//               {student.name?.charAt(0)}
//             </div>

//             <div>
//               <p className="font-semibold text-gray-800">{student.name}</p>
//               <p className="text-sm text-gray-500">{student.email}</p>
//             </div>
//           </div>

//           {/* links */}
//           <div className="grid grid-cols-2 gap-3 mb-4">
//             <a
//               href={student.githubLink}
//               target="_blank"
//               className="text-center bg-gray-900 text-white py-2 rounded-lg hover:bg-black transition shadow"
//             >
//               🔗 GitHub
//             </a>

//             <a
//               href={student.liveUrl}
//               target="_blank"
//               className="text-center bg-gradient-to-r from-lime-500 to-lime-600 text-white py-2 rounded-lg hover:opacity-90 transition shadow"
//             >
//               🚀 Live Demo
//             </a>
//           </div>

//           {/* submitted time */}
//           <p className="text-xs text-gray-400">
//             Submitted: {new Date(student.submittedAt).toLocaleString()}
//           </p>
//         </div>
//       </div>

//       {/* ACTION CARD */}
//       <div className="max-w-6xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">

//         <div>
//           <h3 className="font-semibold text-gray-800">
//             Ready to finalize winner?
//           </h3>
//           <p className="text-sm text-gray-500">
//             This action cannot be undone
//           </p>
//         </div>

//         <button
//           onClick={handleDeclareWinner}
//           className="bg-gradient-to-r from-lime-500 to-lime-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition transform"
//         >
//           🏆 Declare Winner
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminEvaluationPage;


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminEvaluationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const contest = state?.contest;
  const student = state?.student;

  // 🔥 NEW STATES
  const [score, setScore] = useState(50);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("reviewed");
  const [loading, setLoading] = useState(false);

  // 🟢 SUBMIT EVALUATION
  const handleSubmitEvaluation = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.put(
        `https://learn-earn-contest-3.onrender.com/api/v1/admin/evaluate/${student._id}`,
        {
          contestId: contest._id,
          score,
          feedback,
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("✅ Evaluation Submitted!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit evaluation");
    } finally {
      setLoading(false);
    }
  };

  // 🏆 DECLARE WINNER
  const handleDeclareWinner = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://learn-earn-contest-3.onrender.com/api/v1/admin/declare-winner",
        {
          contestId: contest._id,
          studentId: student._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("🏆 Winner Declared!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  if (!contest || !student) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg font-semibold">
        No Data Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6ffe5] via-white to-[#ecfccb] p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            🎯 Evaluation Panel
          </h1>
          <p className="text-gray-500 text-sm">
            Review submission & give score
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 bg-white border rounded-xl shadow-sm hover:bg-gray-50"
        >
          ← Back
        </button>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {/* CONTEST */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg p-6">
          <h2 className="font-semibold mb-3">Contest Info</h2>

          <h3 className="text-xl font-bold">{contest.title}</h3>
          <p className="text-sm text-gray-500 mt-2">{contest.description}</p>

          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>📅 {new Date(contest.deadline).toLocaleDateString()}</p>
            <p>👥 {contest.totalSubmittedStudents} submissions</p>
          </div>
        </div>

        {/* STUDENT */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg p-6">
          <h2 className="font-semibold mb-4">Candidate</h2>

          <p className="font-semibold">{student.name}</p>
          <p className="text-sm text-gray-500">{student.email}</p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <a
              href={student.githubLink}
              target="_blank"
              className="bg-black text-white py-2 rounded-xl text-center"
            >
              GitHub
            </a>

            <a
              href={student.liveUrl}
              target="_blank"
              className="bg-gradient-to-r from-[#82C600] to-[#6ea800] text-white py-2 rounded-xl text-center"
            >
              Live Demo
            </a>
          </div>
        </div>
      </div>

      {/* 🔥 EVALUATION SECTION */}
      <div className="max-w-6xl mx-auto mt-8 bg-white rounded-3xl shadow-xl p-6">

        <h2 className="text-lg font-semibold mb-4">
          📝 Evaluation
        </h2>

        {/* SCORE */}
        <div className="mb-5">
          <label className="text-sm font-medium">Score: {score}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-full accent-[#82C600]"
          />
        </div>

        {/* FEEDBACK */}
        <div className="mb-5">
          <label className="text-sm font-medium">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write feedback..."
            className="w-full border rounded-xl p-3 mt-1 focus:ring-2 focus:ring-[#82C600] outline-none"
          />
        </div>

        {/* STATUS */}
        <div className="mb-6">
          <label className="text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-xl p-2 mt-1"
          >
            <option value="reviewed">Reviewed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">

          <button
            onClick={handleSubmitEvaluation}
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#82C600] to-[#6ea800] text-white rounded-2xl shadow-lg hover:scale-105 transition font-semibold"
          >
            {loading ? "Submitting..." : "✅ Submit Evaluation"}
          </button>

          <button
            onClick={handleDeclareWinner}
            className="w-full md:w-auto px-8 py-3 bg-black text-white rounded-2xl shadow-lg hover:scale-105 transition font-semibold"
          >
            🏆 Declare Winner
          </button>

        </div>
      </div>
    </div>
  );
};

export default AdminEvaluationPage;