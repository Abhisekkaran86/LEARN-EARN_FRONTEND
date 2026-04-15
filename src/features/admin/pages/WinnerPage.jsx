import React, { useEffect, useState } from "react";
import API from "../../../services/axios";

const WinnerListPage = () => {
  const [contests, setContests] = useState([]);
  const [selectedWinner, setSelectedWinner] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/submission/winners");

        console.log("🔥 FULL API RESPONSE:", res.data);

        const data = res?.data?.winners || [];

        setContests(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // ✅ NO EXTRA API CALL
  const handleView = (contest) => {
    setSelectedWinner(contest);
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        🏆 Winners
      </h1>

      {/* ================= LIST ================= */}
      {!selectedWinner && (
        <>
          {contests.length === 0 ? (
            <p className="text-gray-400 text-center">
              No winners found
            </p>
          ) : (
            contests.map((contest) => (
              <div
                key={contest.contestId}
                onClick={() => handleView(contest)}
                className="p-5 mb-4 border rounded-xl cursor-pointer hover:shadow transition"
              >
                <h3 className="font-bold text-lime-600 text-lg">
                  {contest.contestTitle}
                </h3>

                <p className="text-sm text-gray-500">
                  Status: {contest.status}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Click to view winner →
                </p>
              </div>
            ))
          )}
        </>
      )}

      {/* ================= DETAIL ================= */}
      {selectedWinner && (
        <div>

          {/* BACK */}
          <button
            onClick={() => setSelectedWinner(null)}
            className="mb-4 px-4 py-2 bg-gray-200 rounded"
          >
            ← Back
          </button>

          <div className="p-6 border rounded-xl shadow">

            <h2 className="text-xl font-bold text-lime-600 mb-4">
              🏆 {selectedWinner.contestTitle}
            </h2>

            {/* ✅ WINNER INFO */}
            <p>
              <b>Name:</b>{" "}
              {selectedWinner.winner?.user?.name || "N/A"}
            </p>

            <p>
              <b>Email:</b>{" "}
              {selectedWinner.winner?.user?.email || "N/A"}
            </p>

            <p className="mt-2">
              <b>Score:</b>{" "}
              {selectedWinner.winner?.totalScore ?? "N/A"}
            </p>

            <p className="mt-2">
              <b>Status:</b>{" "}
              {selectedWinner.winner?.status || "N/A"}
            </p>

            <p className="mt-2">
              <b>GitHub:</b>{" "}
              {selectedWinner.winner?.githubLink || "N/A"}
            </p>

            <p className="mt-2">
              <b>Live URL:</b>{" "}
              {selectedWinner.winner?.liveUrl || "N/A"}
            </p>

            <p className="mt-2 text-gray-500 text-sm">
              <b>Submitted At:</b>{" "}
              {new Date(
                selectedWinner.winner?.createdAt
              ).toLocaleString()}
            </p>

          </div>
        </div>
      )}

    </div>
  );
};

export default WinnerListPage;