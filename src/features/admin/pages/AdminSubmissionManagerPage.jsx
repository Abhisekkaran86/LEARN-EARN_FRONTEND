import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AlertModal from "@/components/ui/AlertModal";
import UserAvatar from "@/components/ui/UserAvatar";
import useAlertModal from "@/hooks/useAlertModal";
import API from "../../../services/axios";

import {
  FaFileAlt,
  FaGithub,
  FaGlobe,
  FaProjectDiagram,
  FaTrashAlt,
  FaUsers,
} from "react-icons/fa";
import {
  FiArrowLeft,
  FiEdit2,
  FiExternalLink,
  FiRefreshCw,
  FiSave,
  FiSend,
  FiTrendingUp,
} from "react-icons/fi";

const getSubmissionId = (submission) =>
  submission?.submissionId || submission?._id || submission?.id || "";

const getContestId = (contest) =>
  contest?._id || contest?.id || contest?.contestId || "";

const getContestSubmissions = (contest) =>
  contest?.submissionDetails || contest?.studentDetails || [];

const emptyForm = {
  projectTitle: "",
  githubLink: "",
  liveUrl: "",
  description: "",
  teamId: "",
};

const normalizeSubmissionRecord = (submission) => {
  const student =
    submission?.student ||
    submission?.user ||
    (submission?.name || submission?.email
      ? {
          _id: submission?.studentId || submission?.userId || "",
          name: submission?.name || "Student",
          email: submission?.email || "",
          profileImage:
            submission?.profileImage ||
            submission?.profilePicture ||
            submission?.avatar ||
            "",
        }
      : null);

  return {
    ...submission,
    submissionId: getSubmissionId(submission),
    student,
    projectTitle: submission?.projectTitle || submission?.title || "",
    githubLink: submission?.githubLink || "",
    liveUrl: submission?.liveUrl || "",
    description: submission?.description || "",
    teamId: submission?.team?._id || submission?.teamId || submission?.team || "",
  };
};

const buildContestState = (contest) => {
  const submissionDetails = getContestSubmissions(contest)
    .map(normalizeSubmissionRecord)
    .filter(Boolean);

  const uniqueStudentKeys = new Set(
    submissionDetails
      .map(
        (submission) =>
          submission.student?._id || submission.student?.email || ""
      )
      .filter(Boolean)
      .map(String)
  );
  const evaluatedCount = submissionDetails.filter(
    (submission) => submission.status === "evaluated"
  ).length;

  return {
    ...contest,
    _id: getContestId(contest),
    submissionDetails,
    totalSubmissions: submissionDetails.length,
    totalSubmittedStudents:
      uniqueStudentKeys.size || contest?.totalSubmittedStudents || 0,
    totalEvaluatedSubmissions: evaluatedCount,
    totalPendingSubmissions: submissionDetails.length - evaluatedCount,
  };
};

const normalizeSubmissionForm = (submission) => ({
  projectTitle: submission?.projectTitle || submission?.title || "",
  githubLink: submission?.githubLink || "",
  liveUrl: submission?.liveUrl || "",
  description: submission?.description || "",
  teamId: submission?.team?._id || submission?.teamId || submission?.team || "",
});

const buildSubmissionPayload = (contestId, form) => {
  const payload = {
    contestId,
    githubLink: form.githubLink.trim(),
    liveUrl: form.liveUrl.trim(),
  };

  if (form.projectTitle.trim()) {
    payload.projectTitle = form.projectTitle.trim();
  }

  if (form.description.trim()) {
    payload.description = form.description.trim();
  }

  if (form.teamId.trim()) {
    payload.teamId = form.teamId.trim();
    payload.team = form.teamId.trim();
  }

  return payload;
};

const AdminSubmissionManagerPage = () => {
  const navigate = useNavigate();
  const { alertState, showAlert, closeAlert } = useAlertModal();

  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingSubmissionId, setEditingSubmissionId] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    const loadContests = async () => {
      try {
        setLoading(true);

        const res = await API.get("/submission/submitted-contests-count");
        const data = res?.data?.contests || res?.data?.data || [];
        const nextContests = data.map(buildContestState);

        setContests(nextContests);
      } catch (err) {
        showAlert({
          message:
            err.response?.data?.message ||
            "Unable to load total submission records.",
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    loadContests();
  }, [showAlert]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openContest = (contest) => {
    setSelectedContest(contest);
    setEditingSubmissionId("");
    setForm(emptyForm);
  };

  const handleStartEdit = (submission) => {
    setEditingSubmissionId(getSubmissionId(submission));
    setForm(normalizeSubmissionForm(submission));
  };

  const handleCancelEdit = () => {
    setEditingSubmissionId("");
    setForm(emptyForm);
  };

  const syncContestState = (contestId, nextSubmissions) => {
    const normalizedContestId = String(contestId);

    setContests((prev) => {
      if (!nextSubmissions.length) {
        return prev.filter(
          (contest) => String(getContestId(contest)) !== normalizedContestId
        );
      }

      return prev.map((contest) =>
        String(getContestId(contest)) === normalizedContestId
          ? buildContestState({
              ...contest,
              submissionDetails: nextSubmissions,
            })
          : contest
      );
    });

    setSelectedContest((prev) => {
      if (!prev || String(getContestId(prev)) !== normalizedContestId) {
        return prev;
      }

      if (!nextSubmissions.length) {
        return null;
      }

      return buildContestState({
        ...prev,
        submissionDetails: nextSubmissions,
      });
    });
  };

  const handleSaveSubmission = async (submission) => {
    const submissionId = getSubmissionId(submission);
    const contestId = getContestId(selectedContest);

    if (!submissionId || !contestId) {
      showAlert({
        message: "Submission record is missing an ID.",
        variant: "error",
      });
      return;
    }

    if (!form.githubLink.trim()) {
      showAlert({
        message: "GitHub link is required for submission updates.",
        variant: "warning",
      });
      return;
    }

    try {
      setSaving(true);

      const payload = buildSubmissionPayload(contestId, form);
      const res = await API.put(`/submission/${submissionId}`, payload);
      const apiSubmission = res?.data?.submission;
      const nextSubmission = normalizeSubmissionRecord({
        ...submission,
        ...payload,
        ...(apiSubmission || {}),
      });
      const nextSubmissions = (selectedContest?.submissionDetails || []).map(
        (currentSubmission) =>
          getSubmissionId(currentSubmission) === submissionId
            ? {
                ...currentSubmission,
                ...nextSubmission,
              }
            : currentSubmission
      );

      syncContestState(contestId, nextSubmissions);
      setEditingSubmissionId("");
      setForm(emptyForm);

      showAlert({
        message: res.data?.message || "Submission updated successfully.",
        variant: "success",
      });
    } catch (err) {
      showAlert({
        message:
          err.response?.data?.message || "Unable to update this submission.",
        variant: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSubmission = async (submission) => {
    const submissionId = getSubmissionId(submission);
    const contestId = getContestId(selectedContest);

    if (!submissionId || !contestId) {
      showAlert({
        message: "Submission record is missing an ID.",
        variant: "error",
      });
      return;
    }

    if (
      !window.confirm(
        "Delete this submission? This will remove it from the total submissions list."
      )
    ) {
      return;
    }

    try {
      setDeletingId(submissionId);

      const res = await API.delete(`/submission/${submissionId}`);
      const nextSubmissions = (selectedContest?.submissionDetails || []).filter(
        (currentSubmission) =>
          getSubmissionId(currentSubmission) !== submissionId
      );

      syncContestState(contestId, nextSubmissions);

      if (editingSubmissionId === submissionId) {
        setEditingSubmissionId("");
        setForm(emptyForm);
      }

      showAlert({
        message: res.data?.message || "Submission deleted successfully.",
        variant: "success",
      });
    } catch (err) {
      showAlert({
        message:
          err.response?.data?.message || "Unable to delete this submission.",
        variant: "error",
      });
    } finally {
      setDeletingId("");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
        Loading total submissions...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-lime-700">
            <FiTrendingUp className="text-xl" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Total Submission Management
            </h1>
            <p className="text-sm text-gray-500">
              Update and delete contest submissions using your admin APIs.
            </p>
          </div>
        </div>

        {!selectedContest ? (
          contests.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-400">
              No contest submissions found
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {contests.map((contest) => (
                <button
                  key={getContestId(contest)}
                  type="button"
                  onClick={() => openContest(contest)}
                  className="rounded-3xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {contest.title}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        {contest.description || "Contest submissions overview"}
                      </p>
                    </div>

                    <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-lime-700">
                      {contest.totalSubmissions} total
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-gray-50 p-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                        Students
                      </p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">
                        {contest.totalSubmittedStudents || 0}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gray-50 p-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                        Evaluated
                      </p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">
                        {contest.totalEvaluatedSubmissions || 0}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gray-50 p-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                        Pending
                      </p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">
                        {contest.totalPendingSubmissions || 0}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )
        ) : (
          <div className="space-y-6">
            <button
              type="button"
              onClick={() => {
                setSelectedContest(null);
                setEditingSubmissionId("");
                setForm(emptyForm);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300"
            >
              <FiArrowLeft />
              Back
            </button>

            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-lime-700">
                    Contest submissions
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-gray-900">
                    {selectedContest.title}
                  </h2>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-gray-50 px-4 py-3 text-center">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                      Total
                    </p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {selectedContest.totalSubmissions || 0}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 px-4 py-3 text-center">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                      Evaluated
                    </p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {selectedContest.totalEvaluatedSubmissions || 0}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 px-4 py-3 text-center">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                      Pending
                    </p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {selectedContest.totalPendingSubmissions || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {selectedContest.submissionDetails?.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-400">
                No submissions found for this contest
              </div>
            ) : (
              <div className="space-y-4">
                {selectedContest.submissionDetails.map((submission) => {
                  const submissionId = getSubmissionId(submission);
                  const isEditing = editingSubmissionId === submissionId;
                  const submittedAt =
                    submission.submittedAt || submission.createdAt || "";
                  const updatedAt = submission.updatedAt || "";

                  return (
                    <div
                      key={submissionId || `${submission.student?.email}-${submittedAt}`}
                      className="rounded-3xl border bg-white p-6 shadow-sm"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <UserAvatar user={submission.student} size="md" />

                          <div className="min-w-0">
                            <h3 className="truncate text-lg font-semibold text-gray-900">
                              {submission.student?.name || "Student"}
                            </h3>
                            <p className="truncate text-sm text-gray-500">
                              {submission.student?.email || "No email"}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2 text-xs">
                              <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
                                Status: {submission.status || "submitted"}
                              </span>
                              <span className="rounded-full bg-lime-100 px-3 py-1 font-medium text-lime-700">
                                Score: {submission.totalScore ?? 0}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              navigate("/admin/evaluation", {
                                state: {
                                  contest: selectedContest,
                                  submission,
                                  student: submission.student,
                                },
                              })
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-lime-100 px-4 py-2 text-sm font-medium text-lime-700 transition hover:bg-lime-200"
                          >
                            <FiSend />
                            Evaluate
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStartEdit(submission)}
                            disabled={!submissionId || deletingId === submissionId}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <FiEdit2 />
                            Update
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteSubmission(submission)}
                            disabled={!submissionId || saving || deletingId === submissionId}
                            className="inline-flex items-center gap-2 rounded-xl bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <FaTrashAlt />
                            {deletingId === submissionId ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 lg:grid-cols-2">
                        <div className="rounded-2xl bg-gray-50 p-4">
                          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                            <FaProjectDiagram />
                            Project
                          </p>
                          <p className="mt-2 font-medium text-gray-900">
                            {submission.projectTitle || "Untitled project"}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            {submission.description || "No project description added."}
                          </p>
                        </div>

                        <div className="space-y-3 rounded-2xl bg-gray-50 p-4">
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-gray-500">Submitted</span>
                            <span className="font-medium text-gray-900">
                              {submittedAt
                                ? new Date(submittedAt).toLocaleString()
                                : "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-gray-500">Updated</span>
                            <span className="font-medium text-gray-900">
                              {updatedAt ? new Date(updatedAt).toLocaleString() : "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-gray-500">Team ID</span>
                            <span className="font-medium text-gray-900">
                              {submission.teamId || "Individual"}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-3 pt-2">
                            <a
                              href={submission.githubLink || "#"}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
                            >
                              <FaGithub />
                              GitHub
                            </a>

                            <a
                              href={submission.liveUrl || "#"}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-xl bg-[#82C600] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#6ea800]"
                            >
                              <FiExternalLink />
                              Live Demo
                            </a>
                          </div>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50/60 p-5">
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-blue-700">
                              Update submission
                            </p>
                            <p className="mt-1 text-xs text-blue-600">
                              This uses `PUT /submission/{submissionId}`.
                            </p>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                                <FaProjectDiagram /> Project Title
                              </label>
                              <input
                                name="projectTitle"
                                value={form.projectTitle}
                                onChange={handleFormChange}
                                className="w-full rounded-2xl border border-white bg-white px-4 py-3 outline-none focus:border-[#82C600]"
                              />
                            </div>

                            <div>
                              <label className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                                <FaUsers /> Team ID
                              </label>
                              <input
                                name="teamId"
                                value={form.teamId}
                                onChange={handleFormChange}
                                className="w-full rounded-2xl border border-white bg-white px-4 py-3 outline-none focus:border-[#82C600]"
                              />
                            </div>

                            <div>
                              <label className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                                <FaGithub /> GitHub Link
                              </label>
                              <input
                                name="githubLink"
                                value={form.githubLink}
                                onChange={handleFormChange}
                                className="w-full rounded-2xl border border-white bg-white px-4 py-3 outline-none focus:border-[#82C600]"
                              />
                            </div>

                            <div>
                              <label className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                                <FaGlobe /> Live URL
                              </label>
                              <input
                                name="liveUrl"
                                value={form.liveUrl}
                                onChange={handleFormChange}
                                className="w-full rounded-2xl border border-white bg-white px-4 py-3 outline-none focus:border-[#82C600]"
                              />
                            </div>
                          </div>

                          <div className="mt-4">
                            <label className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                              <FaFileAlt /> Description
                            </label>
                            <textarea
                              name="description"
                              value={form.description}
                              onChange={handleFormChange}
                              rows={4}
                              className="w-full rounded-2xl border border-white bg-white px-4 py-3 outline-none focus:border-[#82C600]"
                            />
                          </div>

                          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <button
                              type="button"
                              onClick={() => handleSaveSubmission(submission)}
                              disabled={saving || deletingId === submissionId}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#82C600] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#6ea800] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                              {saving ? <FiRefreshCw /> : <FiSave />}
                              {saving ? "Saving..." : "Save Update"}
                            </button>

                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              disabled={saving}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <AlertModal {...alertState} onClose={closeAlert} />
    </>
  );
};

export default AdminSubmissionManagerPage;
