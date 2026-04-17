import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FiArrowLeft,
  FiAward,
  FiEdit2,
  FiTrash2,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import API from "../../../services/axios";

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
  const location = useLocation();
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [prefillHandled, setPrefillHandled] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editScore, setEditScore] = useState("");
  const [editRemarks, setEditRemarks] = useState("");

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
          API.get("/submission/submitted-contests"),
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
        showToast(
          err.response?.data?.message || "Failed to load evaluation dashboard",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    loadContests();
  }, []);

  useEffect(() => {
    if (prefillHandled || !contests.length) {
      return;
    }

    const routedContestId =
      location.state?.contest?._id ||
      location.state?.contestId ||
      location.state?.submission?.contest?._id ||
      "";
    const routedSubmissionId =
      location.state?.submission?.submissionId ||
      location.state?.submission?._id ||
      "";

    if (!routedContestId) {
      setPrefillHandled(true);
      return;
    }

    const matchedContest = contests.find(
      (contest) => String(contest._id) === String(routedContestId)
    );

    if (!matchedContest) {
      setPrefillHandled(true);
      return;
    }

    setSelectedContest(matchedContest);

    if (routedSubmissionId) {
      const matchedSubmission = (matchedContest.submissionDetails || []).find(
        (submission) =>
          String(submission.submissionId) === String(routedSubmissionId)
      );

      if (matchedSubmission) {
        setEditId(matchedSubmission.submissionId);
        setEditScore(matchedSubmission.totalScore ?? "");
        setEditRemarks(matchedSubmission.remarks || "");
      }
    }

    setPrefillHandled(true);
  }, [contests, location.state, prefillHandled]);

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
    setSelectedContest((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        submissionDetails: prev.submissionDetails.map((submission) =>
          submission.submissionId === submissionId
            ? updater(submission)
            : submission
        ),
      };
    });
  };

  const handleEdit = (submission) => {
    setEditId(submission.submissionId);
    setEditScore(submission.totalScore ?? "");
    setEditRemarks(submission.remarks || "");
  };

  const handleSaveEvaluation = async (submission) => {
    try {
      const payload = {
        totalScore: Number(editScore),
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
        totalScore:
          updatedSubmission?.totalScore ?? Number(editScore),
        remarks: updatedSubmission?.remarks ?? editRemarks,
        status: updatedSubmission?.status || "evaluated",
        updatedAt: updatedSubmission?.updatedAt || current.updatedAt,
      }));

      setEditId(null);
      setEditScore("");
      setEditRemarks("");
      showToast(res.data?.message || "Evaluation saved successfully");
    } catch (err) {
      console.error(err);
      showToast(
        err.response?.data?.message || "Failed to save evaluation",
        "error"
      );
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
      showToast(
        err.response?.data?.message || "Failed to delete evaluation",
        "error"
      );
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

      setEditId((current) =>
        current === submission.submissionId ? null : current
      );
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
      showToast(
        err.response?.data?.message || "Failed to delete submission",
        "error"
      );
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
      showToast(
        err.response?.data?.message || "Failed to declare winner",
        "error"
      );
    }
  };

  if (loading) {
    return (
      <div className="theme-page-shell flex min-h-screen items-center justify-center text-lg">
        Loading evaluation dashboard...
      </div>
    );
  }

  return (
    <div className="theme-page-shell min-h-screen p-4 sm:p-6">
      <h1 className="theme-text mb-6 flex items-center gap-2 text-2xl font-bold sm:text-3xl">
        <FiTrendingUp className="text-lime-600" />
        Evaluation Dashboard
      </h1>

      {!selectedContest && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {contests.map((contest) => (
            <div
              key={contest._id}
              onClick={() => setSelectedContest(contest)}
              className="theme-surface theme-card-hover cursor-pointer rounded-2xl p-4"
            >
              <h3 className="text-lg font-bold text-lime-600">{contest.title}</h3>

              <div className="mt-3 flex justify-between text-sm">
                <span className="flex items-center gap-1 rounded bg-lime-100 px-2 py-1 text-lime-700">
                  <FiUsers /> {contest.totalSubmittedStudents}
                </span>

                <span className="theme-text-muted">View</span>
              </div>

              <p className="theme-text-soft mt-3 text-xs">
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
            className="theme-outline-button mb-6 flex items-center gap-2 rounded-xl px-4 py-2"
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
                className={`theme-surface rounded-2xl p-4 ${
                  index === 0 ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-500/10" : ""
                }`}
              >
                <p className="theme-text font-semibold">{submission.student?.name}</p>
                <p className="theme-text-soft text-sm">{submission.student?.email}</p>

                <div className="theme-text mt-2 flex justify-between">
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
                      className="theme-input w-full rounded-xl px-3 py-2"
                    />

                    <input
                      value={editRemarks}
                      onChange={(e) => setEditRemarks(e.target.value)}
                      className="theme-input w-full rounded-xl px-3 py-2"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEvaluation(submission)}
                        className="theme-brand-button flex-1 rounded-xl py-2 text-sm font-semibold"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditId(null)}
                        className="theme-outline-button flex-1 rounded-xl py-2 text-sm font-semibold"
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
                      className="flex-1 rounded-xl bg-blue-100 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
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
                          ? "rounded-xl bg-red-100 py-2 text-sm font-semibold text-red-700 dark:bg-red-500/15 dark:text-red-300"
                          : "cursor-not-allowed rounded-xl bg-gray-100 py-2 text-sm font-semibold text-gray-400 dark:bg-slate-800"
                      }`}
                    >
                      Reset
                    </button>
                  </div>
                )}

                <button
                  onClick={() => handleDeleteSubmission(submission)}
                  disabled={isWinnerAlreadyDeclared}
                  className={`mt-2 w-full rounded py-1 ${
                    isWinnerAlreadyDeclared
                      ? "cursor-not-allowed rounded-xl bg-gray-100 py-2 text-sm font-semibold text-gray-400 dark:bg-slate-800"
                      : "rounded-xl bg-rose-100 py-2 text-sm font-semibold text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
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
              className={`w-full rounded-2xl py-3 font-semibold ${
                canDeclareWinner
                  ? "theme-brand-button"
                  : "cursor-not-allowed bg-gray-400 text-white"
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
