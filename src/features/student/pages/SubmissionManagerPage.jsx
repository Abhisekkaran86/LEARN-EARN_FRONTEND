import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AlertModal from "@/components/ui/AlertModal";
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
import { FiRefreshCw, FiSend } from "react-icons/fi";

const getSubmissionId = (submission) =>
  submission?.submissionId || submission?._id || submission?.id || "";

const getContestId = (submission) =>
  submission?.contest?._id ||
  submission?.contestId ||
  submission?.contest ||
  submission?.contest?._id ||
  "";

const emptyForm = {
  projectTitle: "",
  githubLink: "",
  liveUrl: "",
  description: "",
  teamId: "",
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

const SubmissionManagerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { alertState, showAlert, closeAlert } = useAlertModal();

  const [form, setForm] = useState(emptyForm);
  const [existingSubmission, setExistingSubmission] = useState(null);
  const [loadingSubmission, setLoadingSubmission] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const cleanId = id?.trim();
  const isEditingExistingSubmission = Boolean(existingSubmission);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const loadExistingSubmission = useCallback(async () => {
    if (!cleanId) {
      setLoadingSubmission(false);
      return;
    }

    try {
      setLoadingSubmission(true);

      const res = await API.get("/submission/my-submissions");
      const submissions =
        res?.data?.submissions ||
        res?.data?.data?.submissions ||
        res?.data?.data ||
        [];
      const matchedSubmission = submissions.find(
        (submission) => String(getContestId(submission)) === cleanId
      );

      setExistingSubmission(matchedSubmission || null);
      setForm(
        matchedSubmission ? normalizeSubmissionForm(matchedSubmission) : emptyForm
      );
    } catch (err) {
      showAlert({
        message:
          err.response?.data?.message ||
          "Unable to load your submission details.",
        variant: "error",
      });
    } finally {
      setLoadingSubmission(false);
    }
  }, [cleanId, showAlert]);

  useEffect(() => {
    loadExistingSubmission();
  }, [loadExistingSubmission]);

  const handleSubmit = async () => {
    if (!cleanId || cleanId.length !== 24) {
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

    try {
      setSaving(true);

      const payload = buildSubmissionPayload(cleanId, form);
      const submissionId = getSubmissionId(existingSubmission);
      const res = isEditingExistingSubmission
        ? await API.put(`/submission/${submissionId}`, payload)
        : await API.post("/submission/submit", payload);

      await loadExistingSubmission();

      showAlert({
        message:
          res.data?.message ||
          (isEditingExistingSubmission
            ? "Submission updated successfully."
            : "Submission completed successfully."),
        variant: "success",
      });
    } catch (err) {
      showAlert({
        message:
          err.response?.data?.message ||
          (isEditingExistingSubmission
            ? "Submission update failed."
            : "Submission failed."),
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

      const res = await API.delete(`/submission/${submissionId}`);

      setExistingSubmission(null);
      setForm(emptyForm);

      showAlert({
        message: res.data?.message || "Submission deleted successfully.",
        variant: "success",
      });
    } catch (err) {
      showAlert({
        message:
          err.response?.data?.message || "Unable to delete submission.",
        variant: "error",
      });
    } finally {
      setDeleting(false);
    }
  };

  const submittedAt = existingSubmission?.submittedAt || existingSubmission?.createdAt;
  const updatedAt = existingSubmission?.updatedAt;

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f1f5f9] via-white to-[#ecfdf5] p-4 sm:p-6">
        <div className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 sm:text-2xl">
                Submit Your Project
              </h2>
              <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#82C600] to-[#6ea800]"></div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/student/my-contests")}
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:border-[#82C600] hover:text-[#82C600]"
            >
              Back
            </button>
          </div>

          {loadingSubmission ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center text-sm text-gray-500">
              Loading your submission details...
            </div>
          ) : (
            <>
              {existingSubmission && (
                <div className="mb-6 rounded-2xl border border-lime-100 bg-lime-50/70 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-lime-700">
                        Existing submission found
                      </p>
                      <p className="mt-1 text-xs text-gray-600">
                        Status: {existingSubmission.status || "submitted"}
                      </p>
                      {submittedAt && (
                        <p className="mt-1 text-xs text-gray-500">
                          Submitted on {new Date(submittedAt).toLocaleString()}
                        </p>
                      )}
                      {updatedAt && (
                        <p className="mt-1 text-xs text-gray-500">
                          Last updated on {new Date(updatedAt).toLocaleString()}
                        </p>
                      )}
                    </div>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-lime-700 shadow-sm">
                      Update mode
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-5 sm:space-y-6">
                <div>
                  <label className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                    <FaProjectDiagram /> Project Title
                  </label>
                  <input
                    name="projectTitle"
                    value={form.projectTitle}
                    onChange={handleChange}
                    placeholder="Enter your project name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 transition focus:ring-2 focus:ring-[#82C600]"
                  />
                </div>

                <div>
                  <label className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                    <FaGithub /> GitHub Repository
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#82C600]">
                    <FaGithub className="text-gray-400" />
                    <input
                      name="githubLink"
                      value={form.githubLink}
                      onChange={handleChange}
                      placeholder="https://github.com/..."
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                    <FaGlobe /> Live URL
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#82C600]">
                    <FaGlobe className="text-gray-400" />
                    <input
                      name="liveUrl"
                      value={form.liveUrl}
                      onChange={handleChange}
                      placeholder="https://your-app.com"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                    <FaUsers /> Team ID (optional)
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#82C600]">
                    <FaUsers className="text-gray-400" />
                    <input
                      name="teamId"
                      value={form.teamId}
                      onChange={handleChange}
                      placeholder="Enter team ID"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                    <FaFileAlt /> Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Explain your project..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 transition focus:ring-2 focus:ring-[#82C600]"
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={saving || deleting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#82C600] to-[#6ea800] py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isEditingExistingSubmission ? <FiRefreshCw /> : <FiSend />}
                    {saving
                      ? isEditingExistingSubmission
                        ? "Updating..."
                        : "Submitting..."
                      : isEditingExistingSubmission
                      ? "Update Submission"
                      : "Submit Project"}
                  </button>

                  {isEditingExistingSubmission && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={saving || deleting}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 py-3 font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <FaTrashAlt />
                      {deleting ? "Deleting..." : "Delete Submission"}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <AlertModal {...alertState} onClose={closeAlert} />
    </>
  );
};

export default SubmissionManagerPage;
