import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import {
  FiArrowLeft,
  FiEdit2,
  FiExternalLink,
  FiTrash2,
} from "react-icons/fi";
import { toast } from "react-toastify";

import API from "../../../services/axios";

const fetchSubmittedContests = async () => {
  const res = await API.get("/submission/submitted-contests-count");
  return res.data?.contests || [];
};

const getContestId = (contest) => contest?._id || contest?.contestId || null;

const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message || error?.message || fallbackMessage;

const formatDateTime = (value) => {
  if (!value) {
    return "N/A";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleString();
};

const SubmissionAdminPage = () => {
  const [contests, setContests] = useState([]);
  const [selectedContestId, setSelectedContestId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ githubLink: "", liveUrl: "" });
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  const selectedContest =
    contests.find((contest) => getContestId(contest) === selectedContestId) ||
    null;

  const refreshContests = async (preserveContestId = null) => {
    const nextContests = await fetchSubmittedContests();
    setContests(nextContests);

    if (!preserveContestId) {
      setSelectedContestId(null);
      return nextContests;
    }

    const updatedContest = nextContests.find(
      (contest) => getContestId(contest) === preserveContestId
    );

    setSelectedContestId(updatedContest ? preserveContestId : null);
    return nextContests;
  };

  useEffect(() => {
    let isMounted = true;

    const loadContests = async () => {
      try {
        setLoading(true);
        const nextContests = await fetchSubmittedContests();

        if (!isMounted) {
          return;
        }

        setContests(nextContests);
      } catch (error) {
        if (isMounted) {
          toast.error(getErrorMessage(error, "Failed to load submissions"));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadContests();

    return () => {
      isMounted = false;
    };
  }, []);

  const resetEditState = () => {
    setEditingId(null);
    setEditForm({ githubLink: "", liveUrl: "" });
  };

  const handleOpenEdit = (submission) => {
    setEditingId(submission.submissionId);
    setEditForm({
      githubLink: submission.githubLink || "",
      liveUrl: submission.liveUrl || "",
    });
  };

  const handleSaveSubmission = async (submissionId) => {
    const githubLink = editForm.githubLink.trim();
    const liveUrl = editForm.liveUrl.trim();

    if (!submissionId) {
      toast.error("Invalid submission ID");
      return;
    }

    if (!githubLink) {
      toast.error("GitHub link is required");
      return;
    }

    try {
      setSavingId(submissionId);
      const currentContestId = selectedContestId;

      const res = await API.put(`/submission/${submissionId}`, {
        githubLink,
        liveUrl,
      });

      await refreshContests(currentContestId);
      resetEditState();
      toast.success(res.data?.message || "Submission updated");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update submission"));
    } finally {
      setSavingId(null);
    }
  };

  const handleDeleteSubmission = async (submissionId) => {
    if (!submissionId) {
      toast.error("Invalid submission ID");
      return;
    }

    if (
      !window.confirm(
        "Delete this submission? The student or team will be able to submit again."
      )
    ) {
      return;
    }

    try {
      setDeletingId(submissionId);
      const currentContestId = selectedContestId;

      await API.delete(`/submission/${submissionId}`);
      toast.success("Submission deleted");

      await refreshContests(currentContestId);
      if (editingId === submissionId) {
        resetEditState();
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to delete submission"));
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="p-6">Loading submissions...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Total Submissions
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Submission edit/delete is connected to the backend now. Evaluation
          edit/delete stays in the evaluation page, and editing an evaluated
          submission may reset it back to pending depending on backend rules.
        </p>
      </div>

      {!selectedContest && (
        <div className="grid gap-4">
          {contests.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-400">
              No submitted contests found.
            </div>
          ) : (
            contests.map((contest) => (
              <button
                key={getContestId(contest)}
                type="button"
                onClick={() => setSelectedContestId(getContestId(contest))}
                className="rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-lime-600">
                  {contest.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">
                  <span>{contest.totalSubmissions || 0} submissions</span>
                  <span>{contest.totalSubmittedStudents || 0} students</span>
                  <span>{contest.totalEvaluatedSubmissions || 0} evaluated</span>
                </div>

                <p className="mt-3 text-xs text-gray-400">
                  Deadline: {formatDateTime(contest.deadline)}
                </p>
              </button>
            ))
          )}
        </div>
      )}

      {selectedContest && (
        <div>
          <button
            type="button"
            onClick={() => setSelectedContestId(null)}
            className="mb-4 inline-flex items-center gap-2 rounded-xl bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700"
          >
            <FiArrowLeft />
            Back
          </button>

          <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-lime-600">
              {selectedContest.title}
            </h2>

            <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">
              <span>{selectedContest.totalSubmissions || 0} total submissions</span>
              <span>{selectedContest.totalSubmittedStudents || 0} students</span>
              <span>
                {selectedContest.totalPendingSubmissions || 0} pending evaluation
              </span>
            </div>
          </div>

          {(selectedContest.submissionDetails || []).length === 0 ? (
            <p className="rounded-2xl bg-white p-6 text-center text-gray-400 shadow-sm">
              No submissions available.
            </p>
          ) : (
            <div className="grid gap-4">
              {selectedContest.submissionDetails.map((submission) => (
                <div
                  key={submission.submissionId}
                  className="rounded-2xl border bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-lime-100 p-3 text-lime-600">
                        <FaUser />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {submission.student?.name || "Unknown student"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {submission.student?.email || "No email"}
                        </p>

                        {submission.team?.teamName && (
                          <p className="mt-1 text-xs text-blue-600">
                            Team: {submission.team.teamName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-gray-500">
                      <p>Status: {submission.status || "pending"}</p>
                      <p>Score: {submission.totalScore ?? 0}</p>
                      <p>Submitted: {formatDateTime(submission.submittedAt)}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-gray-600">
                    Remarks: {submission.remarks || "No remarks"}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={submission.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white"
                    >
                      <FiExternalLink />
                      GitHub
                    </a>

                    {submission.liveUrl && (
                      <a
                        href={submission.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white"
                      >
                        <FiExternalLink />
                        Live Demo
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => navigate("/admin/evaluation")}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white"
                    >
                      Open Evaluation
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(submission)}
                      disabled={savingId === submission.submissionId}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <FiEdit2 />
                      Edit Submission
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteSubmission(submission.submissionId)}
                      disabled={deletingId === submission.submissionId}
                      className="inline-flex items-center gap-2 rounded-lg bg-rose-100 px-3 py-2 text-sm font-medium text-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <FiTrash2 />
                      {deletingId === submission.submissionId
                        ? "Deleting..."
                        : "Delete Submission"}
                    </button>
                  </div>

                  {editingId === submission.submissionId && (
                    <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
                      <h3 className="text-sm font-semibold text-blue-900">
                        Edit submission links
                      </h3>

                      <div className="mt-3 grid gap-3">
                        <label className="grid gap-1">
                          <span className="text-sm font-medium text-gray-700">
                            GitHub Link
                          </span>
                          <input
                            type="url"
                            value={editForm.githubLink}
                            onChange={(event) =>
                              setEditForm((prev) => ({
                                ...prev,
                                githubLink: event.target.value,
                              }))
                            }
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500"
                            placeholder="https://github.com/..."
                          />
                        </label>

                        <label className="grid gap-1">
                          <span className="text-sm font-medium text-gray-700">
                            Live URL
                          </span>
                          <input
                            type="url"
                            value={editForm.liveUrl}
                            onChange={(event) =>
                              setEditForm((prev) => ({
                                ...prev,
                                liveUrl: event.target.value,
                              }))
                            }
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500"
                            placeholder="https://example.com"
                          />
                        </label>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleSaveSubmission(submission.submissionId)
                          }
                          disabled={savingId === submission.submissionId}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-blue-300"
                        >
                          {savingId === submission.submissionId
                            ? "Saving..."
                            : "Save Changes"}
                        </button>

                        <button
                          type="button"
                          onClick={resetEditState}
                          disabled={savingId === submission.submissionId}
                          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmissionAdminPage;
