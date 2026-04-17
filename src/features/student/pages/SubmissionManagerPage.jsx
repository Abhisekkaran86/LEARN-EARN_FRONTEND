import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaFileAlt,
  FaGithub,
  FaGlobe,
  FaProjectDiagram,
  FaTrashAlt,
  FaUsers,
} from "react-icons/fa";
import { FiRefreshCw, FiSend } from "react-icons/fi";

import AlertModal from "@/components/ui/AlertModal";
import useAlertModal from "@/hooks/useAlertModal";
import API from "@/services/axios";

const getSubmissionId = (submission) =>
  submission?.submissionId || submission?._id || submission?.id || "";

const getContestId = (submission) =>
  submission?.contest?._id || submission?.contestId || submission?.contest || "";

const EMPTY_FORM = {
  projectTitle: "",
  githubLink: "",
  liveUrl: "",
  description: "",
  teamName: "",
};

const normalizeSubmissionForm = (submission) => ({
  projectTitle: submission?.projectTitle || submission?.title || "",
  githubLink: submission?.githubLink || "",
  liveUrl: submission?.liveUrl || "",
  description: submission?.description || "",
  teamName: submission?.team?.teamName || submission?.teamName || "",
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

  if (form.teamName.trim()) {
    payload.teamName = form.teamName.trim();
  }

  return payload;
};

const fieldBaseClass =
  "theme-input w-full rounded-xl px-4 py-3 text-sm outline-none sm:text-base";

const iconFieldWrapperClass =
  "theme-surface-muted theme-border flex items-center gap-3 rounded-xl border px-3 py-2.5";

const SubmissionManagerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { alertState, showAlert, closeAlert } = useAlertModal();

  const [form, setForm] = useState(EMPTY_FORM);
  const [existingSubmission, setExistingSubmission] = useState(null);
  const [myTeams, setMyTeams] = useState([]);
  const [loadingSubmission, setLoadingSubmission] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const cleanContestId = id?.trim();
  const isUpdateMode = Boolean(existingSubmission);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const loadExistingSubmission = useCallback(async () => {
    if (!cleanContestId) {
      setLoadingSubmission(false);
      return;
    }

    try {
      setLoadingSubmission(true);

      const response = await API.get("/submission/my-submissions");
      const submissions =
        response?.data?.submissions ||
        response?.data?.data?.submissions ||
        response?.data?.data ||
        [];

      const matchedSubmission = submissions.find(
        (submission) => String(getContestId(submission)) === cleanContestId
      );

      setExistingSubmission(matchedSubmission || null);
      setForm(
        matchedSubmission ? normalizeSubmissionForm(matchedSubmission) : EMPTY_FORM
      );
    } catch (error) {
      showAlert({
        message:
          error?.response?.data?.message ||
          "Unable to load your submission details.",
        variant: "error",
      });
    } finally {
      setLoadingSubmission(false);
    }
  }, [cleanContestId, showAlert]);

  const loadMyTeams = useCallback(async () => {
    if (!cleanContestId) {
      return;
    }

    try {
      const response = await API.get("/team/my-teams");
      const teamsForContest = (response?.data?.teams || []).filter(
        (team) =>
          String(team?.contest?._id || team?.contest || "") === cleanContestId
      );

      setMyTeams(teamsForContest);

      if (teamsForContest.length === 1) {
        setForm((previous) => ({
          ...previous,
          teamName: previous.teamName || teamsForContest[0].teamName || "",
        }));
      }
    } catch (error) {
      console.error(error?.response?.data || error?.message);
      setMyTeams([]);
    }
  }, [cleanContestId]);

  useEffect(() => {
    loadExistingSubmission();
  }, [loadExistingSubmission]);

  useEffect(() => {
    loadMyTeams();
  }, [loadMyTeams]);

  const handleSubmit = async () => {
    if (!cleanContestId || cleanContestId.length !== 24) {
      showAlert({
        message: "Invalid contest ID.",
        variant: "error",
      });
      return;
    }

    if (!form.githubLink.trim()) {
      showAlert({
        message: "GitHub link is required.",
        variant: "warning",
      });
      return;
    }

    if (!isUpdateMode && !form.teamName.trim()) {
      showAlert({
        message: "Team name is required. Join the contest before submitting.",
        variant: "warning",
      });
      return;
    }

    try {
      setSaving(true);

      const payload = buildSubmissionPayload(cleanContestId, form);
      const submissionId = getSubmissionId(existingSubmission);

      const response = isUpdateMode
        ? await API.patch(`/submission/${submissionId}`, payload)
        : await API.post("/submission/submit", payload);

      await loadExistingSubmission();

      showAlert({
        message:
          response?.data?.message ||
          (isUpdateMode
            ? "Submission updated successfully."
            : "Submission completed successfully."),
        variant: "success",
      });
    } catch (error) {
      showAlert({
        message:
          error?.response?.data?.message ||
          (isUpdateMode ? "Submission update failed." : "Submission failed."),
        variant: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const submissionId = getSubmissionId(existingSubmission);

    if (!submissionId) {
      return;
    }

    if (!window.confirm("Delete this submission? You can submit again later.")) {
      return;
    }

    try {
      setDeleting(true);
      const response = await API.delete(`/submission/${submissionId}`);

      setExistingSubmission(null);
      setForm(EMPTY_FORM);

      showAlert({
        message: response?.data?.message || "Submission deleted successfully.",
        variant: "success",
      });
    } catch (error) {
      showAlert({
        message:
          error?.response?.data?.message || "Unable to delete submission.",
        variant: "error",
      });
    } finally {
      setDeleting(false);
    }
  };

  const submittedAt =
    existingSubmission?.submittedAt || existingSubmission?.createdAt;
  const updatedAt = existingSubmission?.updatedAt;

  return (
    <>
      <div className="theme-page-shell min-h-[calc(100vh-150px)] rounded-3xl p-4 sm:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-3xl">
          <section className="theme-surface rounded-3xl p-5 sm:p-8">
            <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="theme-text text-xl font-semibold sm:text-2xl">
                  Submit Your Project
                </h2>
                <p className="theme-text-muted mt-2 text-sm">
                  Keep your submission updated before the contest deadline.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/student/my-contests")}
                className="theme-outline-button rounded-xl px-4 py-2 text-sm font-medium"
              >
                Back
              </button>
            </header>

            {loadingSubmission ? (
              <div className="theme-surface-muted rounded-2xl border border-dashed border-[var(--theme-border)] px-4 py-10 text-center text-sm theme-text-muted">
                Loading your submission details...
              </div>
            ) : (
              <div className="space-y-6">
                {existingSubmission && (
                  <div className="rounded-2xl border border-emerald-300/35 bg-emerald-500/10 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                          Existing submission found
                        </p>
                        <p className="theme-text-soft mt-1 text-xs">
                          Status: {existingSubmission.status || "submitted"}
                        </p>
                        {submittedAt && (
                          <p className="theme-text-muted mt-1 text-xs">
                            Submitted on {new Date(submittedAt).toLocaleString()}
                          </p>
                        )}
                        {updatedAt && (
                          <p className="theme-text-muted mt-1 text-xs">
                            Last updated on {new Date(updatedAt).toLocaleString()}
                          </p>
                        )}
                      </div>

                      <span className="rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-200">
                        Update mode
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <label className="theme-text-muted mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.14em]">
                      <FaProjectDiagram />
                      Project Title
                    </label>
                    <input
                      name="projectTitle"
                      value={form.projectTitle}
                      onChange={handleChange}
                      placeholder="Enter your project name"
                      className={fieldBaseClass}
                    />
                  </div>

                  <div>
                    <label className="theme-text-muted mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.14em]">
                      <FaGithub />
                      GitHub Repository
                    </label>
                    <div className={iconFieldWrapperClass}>
                      <FaGithub className="theme-text-muted" />
                      <input
                        name="githubLink"
                        value={form.githubLink}
                        onChange={handleChange}
                        placeholder="https://github.com/your-repo"
                        className="theme-text w-full bg-transparent text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="theme-text-muted mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.14em]">
                      <FaGlobe />
                      Live URL
                    </label>
                    <div className={iconFieldWrapperClass}>
                      <FaGlobe className="theme-text-muted" />
                      <input
                        name="liveUrl"
                        value={form.liveUrl}
                        onChange={handleChange}
                        placeholder="https://your-app.com"
                        className="theme-text w-full bg-transparent text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="theme-text-muted mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.14em]">
                      <FaUsers />
                      Team Name
                    </label>
                    {myTeams.length > 0 ? (
                      <select
                        name="teamName"
                        value={form.teamName}
                        onChange={handleChange}
                        className={fieldBaseClass}
                      >
                        <option value="">Select your team</option>
                        {myTeams.map((team) => (
                          <option key={team?._id} value={team?.teamName}>
                            {team?.teamName}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className={iconFieldWrapperClass}>
                        <FaUsers className="theme-text-muted" />
                        <input
                          name="teamName"
                          value={form.teamName}
                          onChange={handleChange}
                          placeholder="Enter your joined team name"
                          className="theme-text w-full bg-transparent text-sm outline-none"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="theme-text-muted mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.14em]">
                      <FaFileAlt />
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Explain your project..."
                      className={fieldBaseClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={saving || deleting}
                    className="theme-brand-button flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isUpdateMode ? <FiRefreshCw /> : <FiSend />}
                    {saving
                      ? isUpdateMode
                        ? "Updating..."
                        : "Submitting..."
                      : isUpdateMode
                        ? "Update Submission"
                        : "Submit Project"}
                  </button>

                  {isUpdateMode && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={saving || deleting}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-300/35 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-500/18 disabled:cursor-not-allowed disabled:opacity-70 dark:text-rose-300"
                    >
                      <FaTrashAlt />
                      {deleting ? "Deleting..." : "Delete Submission"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      <AlertModal {...alertState} onClose={closeAlert} />
    </>
  );
};

export default SubmissionManagerPage;
