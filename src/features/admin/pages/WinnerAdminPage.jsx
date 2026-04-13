import { useEffect, useMemo, useState } from "react";
import { FiArrowLeft, FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

import API from "../../../services/axios";

const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message || error?.message || fallbackMessage;

const emptyWinnerForm = {
  name: "",
  email: "",
  phoneNumber: "",
  gender: "",
  teamName: "",
  githubLink: "",
  liveUrl: "",
  totalScore: "",
  remarks: "",
};

const getWinnerCandidates = (payload) => {
  const evaluatedSubmissions = payload?.evaluatedSubmissionDetails || [];

  if (evaluatedSubmissions.length > 0) {
    return evaluatedSubmissions;
  }

  return (payload?.studentDetails || []).filter(
    (submission) => submission.status === "evaluated"
  );
};

const createWinnerForm = (winnerSubmission) => {
  const person = winnerSubmission?.student || winnerSubmission?.user || {};

  return {
    name: person?.name || "",
    email: person?.email || "",
    phoneNumber: person?.phoneNumber || "",
    gender: person?.gender || "",
    teamName: winnerSubmission?.team?.teamName || "",
    githubLink: winnerSubmission?.githubLink || "",
    liveUrl: winnerSubmission?.liveUrl || "",
    totalScore: winnerSubmission?.totalScore ?? "",
    remarks: winnerSubmission?.remarks || "",
  };
};

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

const WinnerAdminPage = () => {
  const [contests, setContests] = useState([]);
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [candidateId, setCandidateId] = useState("");
  const [winnerForm, setWinnerForm] = useState(emptyWinnerForm);
  const [isEditingWinner, setIsEditingWinner] = useState(false);
  const [loadingCandidates, setLoadingCandidates] = useState(false);
  const [savingWinner, setSavingWinner] = useState(false);

  const loadWinners = async (preserveContestId = null) => {
    const res = await API.get("/submission/winners");
    const nextContests = res?.data?.winners || [];

    setContests(nextContests);

    if (!preserveContestId) {
      return nextContests;
    }

    const refreshedSelectedWinner = nextContests.find(
      (contest) => String(contest.contestId) === String(preserveContestId)
    );

    setSelectedWinner(refreshedSelectedWinner || null);
    return nextContests;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadWinners();
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to load winners"));
      }
    };

    fetchData();
  }, []);

  const sortedCandidates = useMemo(
    () =>
      [...candidates].sort((a, b) => {
        const scoreDiff = (b.totalScore || 0) - (a.totalScore || 0);

        if (scoreDiff !== 0) {
          return scoreDiff;
        }

        return new Date(a.submittedAt || 0) - new Date(b.submittedAt || 0);
      }),
    [candidates]
  );

  const selectedCandidate = useMemo(
    () =>
      sortedCandidates.find(
        (submission) => String(submission.submissionId) === String(candidateId)
      ) || null,
    [sortedCandidates, candidateId]
  );

  const displayedWinner = selectedWinner?.winner || null;
  const activeWinnerSource = selectedCandidate || displayedWinner;
  const hasTeam = Boolean(
    activeWinnerSource?.team?._id || activeWinnerSource?.team?.teamName
  );

  const resetEditState = () => {
    setCandidates([]);
    setCandidateId("");
    setWinnerForm(emptyWinnerForm);
    setIsEditingWinner(false);
  };

  const handleView = (contest) => {
    setSelectedWinner(contest);
    resetEditState();
  };

  const handleBack = () => {
    setSelectedWinner(null);
    resetEditState();
  };

  const handleOpenEdit = async () => {
    if (!selectedWinner?.contestId) {
      toast.error("Contest not found");
      return;
    }

    try {
      setLoadingCandidates(true);
      const res = await API.get(
        `/submission/contest-report/${selectedWinner.contestId}`
      );

      const evaluatedSubmissions = getWinnerCandidates(res.data);
      const initialCandidateId = selectedWinner?.winner?._id
        ? String(selectedWinner.winner._id)
        : String(evaluatedSubmissions[0]?.submissionId || "");
      const initialCandidate =
        evaluatedSubmissions.find(
          (submission) =>
            String(submission.submissionId) === String(initialCandidateId)
        ) || selectedWinner?.winner;

      setCandidates(evaluatedSubmissions);
      setCandidateId(initialCandidateId);
      setWinnerForm(createWinnerForm(initialCandidate));
      setIsEditingWinner(true);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to load winner candidates"));
    } finally {
      setLoadingCandidates(false);
    }
  };

  const handleCandidateChange = (submission) => {
    setCandidateId(String(submission.submissionId));
    setWinnerForm(createWinnerForm(submission));
  };

  const handleFormChange = (field, value) => {
    setWinnerForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveWinner = async () => {
    if (!selectedWinner?.contestId || !candidateId) {
      toast.error("Please select a winner submission");
      return;
    }

    if (!winnerForm.name.trim()) {
      toast.error("Winner name is required");
      return;
    }

    if (!winnerForm.email.trim()) {
      toast.error("Winner email is required");
      return;
    }

    if (!winnerForm.githubLink.trim()) {
      toast.error("GitHub link is required");
      return;
    }

    if (hasTeam && !winnerForm.teamName.trim()) {
      toast.error("Team name is required");
      return;
    }

    const normalizedScore = Number(winnerForm.totalScore);

    if (
      winnerForm.totalScore === "" ||
      Number.isNaN(normalizedScore) ||
      normalizedScore < 0
    ) {
      toast.error("Enter a valid score greater than or equal to 0");
      return;
    }

    try {
      setSavingWinner(true);
      const contestId = selectedWinner.contestId;

      await API.put(
        `/submission/contest/${contestId}/winner`,
        { winnerSubmissionId: candidateId }
      );

      const payload = {
        name: winnerForm.name.trim(),
        email: winnerForm.email.trim(),
        phoneNumber: winnerForm.phoneNumber.trim(),
        gender: winnerForm.gender || "",
        githubLink: winnerForm.githubLink.trim(),
        liveUrl: winnerForm.liveUrl.trim(),
        totalScore: normalizedScore,
        remarks: winnerForm.remarks,
      };

      if (hasTeam) {
        payload.teamName = winnerForm.teamName.trim();
      }

      const res = await API.put(
        `/submission/contest/${contestId}/winner-details`,
        payload
      );

      const refreshedWinners = await loadWinners(contestId);
      const refreshedSelectedWinner = refreshedWinners.find(
        (contest) => String(contest.contestId) === String(contestId)
      );

      setSelectedWinner(refreshedSelectedWinner || null);
      resetEditState();
      toast.success(res.data?.message || "Winner details updated successfully");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update winner details"));
    } finally {
      setSavingWinner(false);
    }
  };

  const handleDeleteWinner = async () => {
    if (!selectedWinner?.contestId) {
      toast.error("Contest not found");
      return;
    }

    if (!window.confirm("Delete this winner from the contest?")) {
      return;
    }

    try {
      setSavingWinner(true);

      const contestId = selectedWinner.contestId;
      const res = await API.delete(`/submission/contest/${contestId}/winner`);

      await loadWinners();
      setSelectedWinner(null);
      resetEditState();

      toast.success(res.data?.message || "Winner deleted successfully");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to delete winner"));
    } finally {
      setSavingWinner(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Winners</h1>
        <p className="mt-2 text-sm text-gray-500">
          Winner details are fully editable here. You can change the selected
          winner and update the winner&apos;s personal info, score, remarks,
          links, and team name from one form.
        </p>
      </div>

      {!selectedWinner && (
        <>
          {contests.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-400">
              No winners found.
            </div>
          ) : (
            <div className="grid gap-4">
              {contests.map((contest) => (
                <button
                  key={contest.contestId}
                  type="button"
                  onClick={() => handleView(contest)}
                  className="rounded-xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow"
                >
                  <h3 className="text-lg font-bold text-lime-600">
                    {contest.contestTitle}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Status: {contest.status}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Click to view or edit winner details
                  </p>
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {selectedWinner && (
        <div>
          <button
            type="button"
            onClick={handleBack}
            className="mb-4 inline-flex items-center gap-2 rounded-xl bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700"
          >
            <FiArrowLeft />
            Back
          </button>

          <div className="rounded-xl border bg-white p-6 shadow">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-lime-600">
                  {selectedWinner.contestTitle}
                </h2>

                <p>
                  <b>Name:</b> {displayedWinner?.user?.name || "N/A"}
                </p>
                <p>
                  <b>Email:</b> {displayedWinner?.user?.email || "N/A"}
                </p>
                <p>
                  <b>Phone:</b> {displayedWinner?.user?.phoneNumber || "N/A"}
                </p>
                <p>
                  <b>Gender:</b> {displayedWinner?.user?.gender || "N/A"}
                </p>
                {displayedWinner?.team?.teamName && (
                  <p>
                    <b>Team:</b> {displayedWinner.team.teamName}
                  </p>
                )}
                <p>
                  <b>Score:</b> {displayedWinner?.totalScore ?? "N/A"}
                </p>
                <p>
                  <b>Status:</b> {displayedWinner?.status || "N/A"}
                </p>
                <p>
                  <b>Remarks:</b> {displayedWinner?.remarks || "No remarks"}
                </p>
                <p className="break-all">
                  <b>GitHub:</b> {displayedWinner?.githubLink || "N/A"}
                </p>
                <p className="break-all">
                  <b>Live URL:</b> {displayedWinner?.liveUrl || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  <b>Submitted At:</b> {formatDateTime(displayedWinner?.createdAt)}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleOpenEdit}
                  disabled={loadingCandidates || savingWinner}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiEdit2 />
                  {loadingCandidates ? "Loading..." : "Edit Winner Details"}
                </button>

                <button
                  type="button"
                  onClick={handleDeleteWinner}
                  disabled={savingWinner}
                  className="inline-flex items-center gap-2 rounded-lg bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiTrash2 />
                  {savingWinner ? "Please wait..." : "Delete Winner"}
                </button>
              </div>
            </div>

            {isEditingWinner && (
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <h3 className="text-base font-semibold text-blue-900">
                  Edit Winner Details
                </h3>

                {sortedCandidates.length === 0 ? (
                  <p className="mt-3 text-sm text-blue-700">
                    No evaluated submissions found for this contest.
                  </p>
                ) : (
                  <>
                    <div className="mt-4 space-y-3">
                      {sortedCandidates.map((submission) => (
                        <label
                          key={submission.submissionId}
                          className="flex cursor-pointer items-start gap-3 rounded-lg border bg-white p-3"
                        >
                          <input
                            type="radio"
                            name="winnerSubmission"
                            checked={
                              String(candidateId) ===
                              String(submission.submissionId)
                            }
                            onChange={() => handleCandidateChange(submission)}
                            className="mt-1"
                          />

                          <div>
                            <p className="font-medium text-gray-900">
                              {submission.student?.name || "Unknown student"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {submission.student?.email || "No email"}
                            </p>
                            {submission.team?.teamName && (
                              <p className="mt-1 text-xs text-blue-700">
                                Team: {submission.team.teamName}
                              </p>
                            )}
                            <p className="mt-1 text-sm text-blue-700">
                              Score: {submission.totalScore ?? 0}
                            </p>
                            <p className="text-xs text-gray-500">
                              Remarks: {submission.remarks || "No remarks"}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <label className="grid gap-1">
                        <span className="text-sm font-medium text-gray-700">
                          Name
                        </span>
                        <input
                          type="text"
                          value={winnerForm.name}
                          onChange={(event) =>
                            handleFormChange("name", event.target.value)
                          }
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500"
                        />
                      </label>

                      <label className="grid gap-1">
                        <span className="text-sm font-medium text-gray-700">
                          Email
                        </span>
                        <input
                          type="email"
                          value={winnerForm.email}
                          onChange={(event) =>
                            handleFormChange("email", event.target.value)
                          }
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500"
                        />
                      </label>

                      <label className="grid gap-1">
                        <span className="text-sm font-medium text-gray-700">
                          Phone Number
                        </span>
                        <input
                          type="text"
                          value={winnerForm.phoneNumber}
                          onChange={(event) =>
                            handleFormChange("phoneNumber", event.target.value)
                          }
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500"
                        />
                      </label>

                      <label className="grid gap-1">
                        <span className="text-sm font-medium text-gray-700">
                          Gender
                        </span>
                        <select
                          value={winnerForm.gender}
                          onChange={(event) =>
                            handleFormChange("gender", event.target.value)
                          }
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500"
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer not to say">
                            Prefer not to say
                          </option>
                        </select>
                      </label>

                      {hasTeam && (
                        <label className="grid gap-1">
                          <span className="text-sm font-medium text-gray-700">
                            Team Name
                          </span>
                          <input
                            type="text"
                            value={winnerForm.teamName}
                            onChange={(event) =>
                              handleFormChange("teamName", event.target.value)
                            }
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500"
                          />
                        </label>
                      )}

                      <label className="grid gap-1">
                        <span className="text-sm font-medium text-gray-700">
                          Total Score
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={winnerForm.totalScore}
                          onChange={(event) =>
                            handleFormChange("totalScore", event.target.value)
                          }
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500"
                        />
                      </label>

                      <label className="grid gap-1 md:col-span-2">
                        <span className="text-sm font-medium text-gray-700">
                          GitHub Link
                        </span>
                        <input
                          type="url"
                          value={winnerForm.githubLink}
                          onChange={(event) =>
                            handleFormChange("githubLink", event.target.value)
                          }
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500"
                        />
                      </label>

                      <label className="grid gap-1 md:col-span-2">
                        <span className="text-sm font-medium text-gray-700">
                          Live URL
                        </span>
                        <input
                          type="url"
                          value={winnerForm.liveUrl}
                          onChange={(event) =>
                            handleFormChange("liveUrl", event.target.value)
                          }
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500"
                        />
                      </label>

                      <label className="grid gap-1 md:col-span-2">
                        <span className="text-sm font-medium text-gray-700">
                          Remarks
                        </span>
                        <textarea
                          rows="4"
                          value={winnerForm.remarks}
                          onChange={(event) =>
                            handleFormChange("remarks", event.target.value)
                          }
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500"
                        />
                      </label>
                    </div>

                    {selectedCandidate && (
                      <p className="mt-4 text-xs text-gray-500">
                        Selected submission time:{" "}
                        {formatDateTime(selectedCandidate.submittedAt)}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleSaveWinner}
                        disabled={!candidateId || savingWinner}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-blue-300"
                      >
                        {savingWinner ? "Saving..." : "Save Winner Details"}
                      </button>

                      <button
                        type="button"
                        onClick={resetEditState}
                        disabled={savingWinner}
                        className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WinnerAdminPage;
