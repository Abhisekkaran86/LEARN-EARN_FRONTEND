import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiAward,
  FiEdit2,
  FiTrash2,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import API from "../../../services/axios";

const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message || error?.message || fallbackMessage;

const getToastClasses = (tone) => {
  if (tone === "error") {
    return "bg-red-500 text-white";
  }

  if (tone === "warning") {
    return "bg-amber-500 text-white";
  }

  return "bg-green-500 text-white";
};

const AdminEvaluationDashboard = () => {
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editScore, setEditScore] = useState("");
  const [editRemarks, setEditRemarks] = useState("");

  const resetEditState = () => {
    setEditId(null);
    setEditScore("");
    setEditRemarks("");
  };

  const showToast = (message, tone = "success") => {
    setToast({ message, tone });
    window.setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  useEffect(() => {
    const loadContests = async () => {
      try {
        const [contestsRes, winnersRes] = await Promise.all([
          API.get("/submission/submitted-contests-count"),
          API.get("/submission/winners").catch(() => null),
        ]);

        const data =
          contestsRes?.data?.contests || contestsRes?.data?.data || [];
        const winners = winnersRes?.data?.winners || [];
        const winnersByContestId = new Map(
          winners.map((item) => [String(item.contestId), item.winner])
        );

        setContests(
          data.map((contest) => {
            const winner = winnersByContestId.get(String(contest._id)) || null;

            return {
              ...contest,
              isClosed: Boolean(winner),
              winner,
            };
          })
        );
      } catch (err) {
        console.error(err);
        showToast(getErrorMessage(err, "Failed to load evaluation dashboard"), "error");
      } finally {
        setLoading(false);
      }
    };

    loadContests();
  }, []);

  const sortedSubmissions = [...(selectedContest?.submissionDetails || [])].sort(
    (a, b) => {
      const scoreDiff = (b.totalScore || 0) - (a.totalScore || 0);
      if (scoreDiff !== 0) return scoreDiff;

      return (
        new Date(a.submittedAt || a.createdAt || 0) -
        new Date(b.submittedAt || b.createdAt || 0)
      );
    }
  );

  const isAllEvaluated = () => {
    if (!selectedContest?.submissionDetails?.length) return false;
    return selectedContest.submissionDetails.every(
      (submission) => submission.status === "evaluated"
    );
  };

  const hasDeadlinePassed = () => {
    if (!selectedContest?.deadline) return false;
    return new Date() >= new Date(selectedContest.deadline);
  };

  const isWinnerAlreadyDeclared = Boolean(
    selectedContest?.isClosed || selectedContest?.winner
  );

  const canDeclareWinner =
    Boolean(selectedContest?.submissionDetails?.length) &&
    isAllEvaluated() &&
    hasDeadlinePassed() &&
    !isWinnerAlreadyDeclared;

  const buildContestState = (contest, submissionDetails) => {
    const uniqueStudentIds = new Set(
      submissionDetails
        .map((submission) => submission.student?._id)
        .filter(Boolean)
        .map(String)
    );
    const evaluatedSubmissions = submissionDetails.filter(
      (submission) => submission.status === "evaluated"
    );
    const evaluatedStudentIds = new Set(
      evaluatedSubmissions
        .map((submission) => submission.student?._id)
        .filter(Boolean)
        .map(String)
    );

    return {
      ...contest,
      submissionDetails,
      totalSubmissions: submissionDetails.length,
      totalSubmittedStudents: uniqueStudentIds.size,
      totalEvaluatedSubmissions: evaluatedSubmissions.length,
      totalPendingSubmissions:
        submissionDetails.length - evaluatedSubmissions.length,
      totalEvaluatedStudents: evaluatedStudentIds.size,
    };
  };

  const updateSelectedContestSubmission = (submissionId, updater) => {
    if (!selectedContest?._id) {
      return;
    }

    const nextSubmissions = (selectedContest.submissionDetails || []).map(
      (submission) =>
        submission.submissionId === submissionId ? updater(submission) : submission
    );

    const nextSelectedContest = buildContestState(selectedContest, nextSubmissions);

    setSelectedContest((prev) => {
      if (!prev || prev._id !== selectedContest._id) {
        return prev;
      }

      return {
        ...nextSelectedContest,
        winner: prev.winner,
        isClosed: prev.isClosed,
      };
    });

    setContests((prev) =>
      prev.map((contest) => {
        if (contest._id !== selectedContest._id) {
          return contest;
        }

        const nextContest = buildContestState(contest, nextSubmissions);

        return {
          ...nextContest,
          winner: contest.winner,
          isClosed: contest.isClosed,
        };
      })
    );
  };

  const handleEdit = (submission) => {
    setEditId(submission.submissionId);
    setEditScore(submission.totalScore ?? "");
    setEditRemarks(submission.remarks || "");
  };

  const handleSaveEvaluation = async (submission) => {
    const normalizedScore = Number(editScore);

    if (editScore === "" || Number.isNaN(normalizedScore) || normalizedScore < 0) {
      showToast("Enter a valid score greater than or equal to 0", "warning");
      return;
    }

    try {
      const payload = {
        totalScore: normalizedScore,
        remarks: editRemarks,
      };

      const isAlreadyEvaluated = submission.status === "evaluated";
      const route = isAlreadyEvaluated
        ? `/submission/evaluation/${submission.submissionId}`
        : `/submission/evaluate/${submission.submissionId}`;

      const res = await API.put(route, payload);
      const updatedSubmission = res.data?.submission;

      updateSelectedContestSubmission(submission.submissionId, (current) => ({
        ...current,
        totalScore: updatedSubmission?.totalScore ?? normalizedScore,
        remarks: updatedSubmission?.remarks ?? editRemarks,
        status: updatedSubmission?.status || "evaluated",
        updatedAt: updatedSubmission?.updatedAt || current.updatedAt,
      }));

      resetEditState();
      showToast(res.data?.message || "Evaluation saved successfully");
    } catch (err) {
      console.error(err);
      showToast(getErrorMessage(err, "Failed to save evaluation"), "error");
    }
  };

  const handleDeleteEvaluation = async (submission) => {
    if (!window.confirm("Delete this evaluation and move it back to pending?")) {
      return;
    }

    try {
      const res = await API.delete(`/submission/evaluation/${submission.submissionId}`);

      updateSelectedContestSubmission(submission.submissionId, (current) => ({
        ...current,
        totalScore: 0,
        remarks: "",
        status: "pending",
      }));

      showToast(res.data?.message || "Evaluation deleted successfully");
    } catch (err) {
      console.error(err);
      showToast(getErrorMessage(err, "Failed to delete evaluation"), "error");
    }
  };

  const handleDeleteSubmission = async (submission) => {
    if (
      !window.confirm(
        "Delete this submission? This will remove the project and allow the student or team to submit again."
      )
    ) {
      return;
    }

    try {
      const res = await API.delete(`/submission/${submission.submissionId}`);
      const nextSubmissions = (selectedContest?.submissionDetails || []).filter(
        (item) => item.submissionId !== submission.submissionId
      );

      setEditId((current) => (current === submission.submissionId ? null : current));
      setEditScore("");
      setEditRemarks("");

      setContests((prev) =>
        prev.flatMap((contest) => {
          if (contest._id !== selectedContest?._id) {
            return [contest];
          }

          if (nextSubmissions.length === 0) {
            return [];
          }

          return [buildContestState(contest, nextSubmissions)];
        })
      );

      setSelectedContest((prev) => {
        if (!prev || prev._id !== selectedContest?._id) {
          return prev;
        }

        if (nextSubmissions.length === 0) {
          return null;
        }

        return buildContestState(prev, nextSubmissions);
      });

      showToast(res.data?.message || "Submission deleted successfully");
    } catch (err) {
      console.error(err);
      showToast(getErrorMessage(err, "Failed to delete submission"), "error");
    }
  };

  const handleDeclareWinner = async () => {
    if (!selectedContest?._id) {
      showToast("Contest not selected", "error");
      return;
    }

    if (isWinnerAlreadyDeclared) {
      showToast("Winner already declared for this contest", "warning");
      return;
    }

    if (!hasDeadlinePassed()) {
      showToast("Winner can be declared only after contest deadline", "warning");
      return;
    }

    if (!isAllEvaluated()) {
      showToast("Evaluate all submissions before declaring the winner", "warning");
      return;
    }

    try {
      const res = await API.put(
        `/submission/contest/${selectedContest._id}/declare-winner`,
        { contestId: selectedContest._id }
      );

      setSelectedContest((prev) => ({
        ...prev,
        status: "completed",
        isClosed: true,
        winner: res.data?.winner || prev?.winner || null,
      }));

      setContests((prev) =>
        prev.map((contest) =>
          contest._id === selectedContest._id
            ? {
                ...contest,
                status: "completed",
                isClosed: true,
                winner: res.data?.winner || contest.winner || null,
              }
            : contest
        )
      );

      showToast(res.data?.message || "Winner declared successfully");
    } catch (err) {
      console.error(err);
      showToast(getErrorMessage(err, "Failed to declare winner"), "error");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg text-gray-400">
        Loading evaluation dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800 sm:text-3xl">
        <FiTrendingUp className="text-lime-600" />
        Evaluation Dashboard
      </h1>

      {!selectedContest && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {contests.map((contest) => (
            <div
              key={contest._id}
              onClick={() => setSelectedContest(contest)}
              className="cursor-pointer rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-lime-600">{contest.title}</h3>

              <div className="mt-3 flex justify-between text-sm">
                <span className="flex items-center gap-1 rounded bg-lime-100 px-2 py-1 text-lime-700">
                  <FiUsers /> {contest.totalSubmittedStudents}
                </span>

                <span className="text-gray-400">View</span>
              </div>

              <p className="mt-3 text-xs text-gray-500">
                Deadline:{" "}
                {contest.deadline
                  ? new Date(contest.deadline).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedContest && (
        <div>
          <button
            onClick={() => {
              setSelectedContest(null);
              setEditId(null);
            }}
            className="mb-6 flex items-center gap-2 rounded-xl bg-gray-200 px-4 py-2"
          >
            <FiArrowLeft />
            Back
          </button>

          <h2 className="mb-4 text-xl font-bold text-lime-600">
            {selectedContest.title}
          </h2>

          {!hasDeadlinePassed() && (
            <p className="mb-4 text-sm text-amber-600">
              Winner can be declared only after deadline:{" "}
              {selectedContest.deadline
                ? new Date(selectedContest.deadline).toLocaleString()
                : "N/A"}
            </p>
          )}

          {!isAllEvaluated() && (
            <p className="mb-4 text-sm text-red-500">
              Evaluate all submissions before declaring the winner.
            </p>
          )}

          {isWinnerAlreadyDeclared && (
            <p className="mb-4 text-sm text-green-600">
              Winner has already been declared for this contest.
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sortedSubmissions.map((submission, index) => (
              <div
                key={submission.submissionId}
                className={`rounded-2xl p-4 shadow ${
                  index === 0 ? "border border-yellow-400 bg-yellow-50" : "bg-white"
                }`}
              >
                <p className="font-semibold">{submission.student?.name}</p>
                <p className="text-sm text-gray-500">{submission.student?.email}</p>

                <div className="mt-2 flex justify-between">
                  <span>Score: {submission.totalScore || 0}</span>
                  <span>{submission.status}</span>
                </div>

                <p className="mt-1 text-xs text-blue-600">
                  Remarks: {submission.remarks || "No remarks"}
                </p>

                {editId === submission.submissionId ? (
                  <div className="mt-3 space-y-2">
                    <input
                      type="number"
                      value={editScore}
                      onChange={(e) => setEditScore(e.target.value)}
                      className="w-full rounded border px-2 py-1"
                    />

                    <input
                      value={editRemarks}
                      onChange={(e) => setEditRemarks(e.target.value)}
                      className="w-full rounded border px-2 py-1"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEvaluation(submission)}
                        className="flex-1 rounded bg-green-500 py-1 text-white"
                      >
                        Save
                      </button>

                      <button
                        onClick={resetEditState}
                        className="flex-1 rounded bg-gray-300 py-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(submission)}
                      disabled={isWinnerAlreadyDeclared}
                      className="flex-1 rounded bg-blue-100 py-1 text-blue-600"
                    >
                      <span className="inline-flex items-center gap-1">
                        <FiEdit2 />
                        {submission.status === "evaluated" ? "Edit" : "Evaluate"}
                      </span>
                    </button>

                    <button
                      onClick={() => handleDeleteEvaluation(submission)}
                      disabled={
                        submission.status !== "evaluated" || isWinnerAlreadyDeclared
                      }
                      className={`flex-1 rounded py-1 ${
                        submission.status === "evaluated" && !isWinnerAlreadyDeclared
                          ? "bg-red-100 text-red-600"
                          : "cursor-not-allowed bg-gray-100 text-gray-400"
                      }`}
                    >
                      Delete Evaluation
                    </button>
                  </div>
                )}

                <button
                  onClick={() => handleDeleteSubmission(submission)}
                  disabled={isWinnerAlreadyDeclared}
                  className={`mt-2 w-full rounded py-1 ${
                    isWinnerAlreadyDeclared
                      ? "cursor-not-allowed bg-gray-100 text-gray-400"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    <FiTrash2 />
                    Delete Submission
                  </span>
                </button>

                {index === 0 && (
                  <div className="mt-2 text-sm text-yellow-600">Top Rank</div>
                )}
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-md">
            <button
              onClick={handleDeclareWinner}
              disabled={!canDeclareWinner}
              className={`w-full rounded-xl py-3 font-semibold text-white ${
                canDeclareWinner
                  ? "bg-green-500"
                  : "cursor-not-allowed bg-gray-400"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <FiAward />
                Declare Winner
              </span>
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
          <div
            className={`rounded-xl px-4 py-2 shadow-lg ${getToastClasses(
              toast.tone
            )}`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvaluationDashboard;
