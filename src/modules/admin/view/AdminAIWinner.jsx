import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminEvaluationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const contest = state?.contest;
  const student = state?.student;

  const handleDeclareWinner = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://learn-earn-contest-2.onrender.com/api/v1/admin/declare-winner",
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
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        No Data Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-lime-100 p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            🎯 Evaluation Panel
          </h1>
          <p className="text-gray-500 mt-1">
            Review submission & declare winner
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100"
        >
          ← Back
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {/* CONTEST CARD */}
        <div className="bg-white/80 backdrop-blur-lg border rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Contest Info
            </h2>

            <span className="px-3 py-1 text-xs rounded-full bg-lime-100 text-lime-700">
              {contest.status}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {contest.title}
          </h3>

          <p className="text-gray-500 text-sm mb-4">
            {contest.description}
          </p>

          <div className="space-y-2 text-sm text-gray-600">
            <p>📅 Deadline: {new Date(contest.deadline).toLocaleDateString()}</p>
            <p>👥 Submissions: {contest.totalSubmittedStudents}</p>
          </div>

          {/* reward badge */}
          <div className="mt-4 bg-lime-50 p-3 rounded-lg text-lime-700 text-sm font-medium">
            🏆 {contest.rewards?.[0]}
          </div>
        </div>

        {/* STUDENT CARD */}
        <div className="bg-white/80 backdrop-blur-lg border rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Candidate
          </h2>

          {/* profile */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-lime-400 to-lime-600 text-white flex items-center justify-center font-bold text-lg shadow">
              {student.name?.charAt(0)}
            </div>

            <div>
              <p className="font-semibold text-gray-800">{student.name}</p>
              <p className="text-sm text-gray-500">{student.email}</p>
            </div>
          </div>

          {/* links */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <a
              href={student.githubLink}
              target="_blank"
              className="text-center bg-gray-900 text-white py-2 rounded-lg hover:bg-black transition shadow"
            >
              🔗 GitHub
            </a>

            <a
              href={student.liveUrl}
              target="_blank"
              className="text-center bg-gradient-to-r from-lime-500 to-lime-600 text-white py-2 rounded-lg hover:opacity-90 transition shadow"
            >
              🚀 Live Demo
            </a>
          </div>

          {/* submitted time */}
          <p className="text-xs text-gray-400">
            Submitted: {new Date(student.submittedAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* ACTION CARD */}
      <div className="max-w-6xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">

        <div>
          <h3 className="font-semibold text-gray-800">
            Ready to finalize winner?
          </h3>
          <p className="text-sm text-gray-500">
            This action cannot be undone
          </p>
        </div>

        <button
          onClick={handleDeclareWinner}
          className="bg-gradient-to-r from-lime-500 to-lime-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition transform"
        >
          🏆 Declare Winner
        </button>
      </div>
    </div>
  );
};

export default AdminEvaluationPage;