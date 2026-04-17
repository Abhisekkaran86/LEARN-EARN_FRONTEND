import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowRight, FiClock, FiUser, FiUsers } from "react-icons/fi";

import ContestPreviewModal from "../ContestPreviewModal";
import { fetchMyParticipation } from "../participationSlice";

const getContestFromParticipation = (participation) =>
  participation?.contest || participation?.team?.contest || null;

const getDaysLeft = (deadline) => {
  if (!deadline) {
    return null;
  }

  const deadlineDate = new Date(deadline);

  if (Number.isNaN(deadlineDate.getTime())) {
    return null;
  }

  const diffMs = deadlineDate.getTime() - Date.now();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

const MyActiveContestsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedContest, setSelectedContest] = useState(null);

  const { history = [], loading } = useSelector((state) => state.participation);
  const currentUserId = useSelector((state) => state.auth.user?._id);

  useEffect(() => {
    dispatch(fetchMyParticipation());
  }, [dispatch]);

  const activeParticipations = useMemo(
    () =>
      history.filter((participation) => {
        const contest = getContestFromParticipation(participation);
        const deadline = contest?.deadline ? new Date(contest.deadline) : null;
        return deadline && !Number.isNaN(deadline.getTime()) && deadline > new Date();
      }),
    [history]
  );

  return (
    <div className="theme-page-shell min-h-[calc(100vh-150px)] rounded-3xl p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="theme-text text-2xl font-bold tracking-tight sm:text-3xl">
          My Active Contests
        </h1>
        <p className="theme-text-muted text-sm sm:text-base">
          Open any card to view full details in modal, then submit from there or
          directly from the card.
        </p>
      </div>

      {loading ? (
        <div className="theme-surface rounded-2xl p-8 text-center">
          <p className="theme-text-soft">Loading your contests...</p>
        </div>
      ) : activeParticipations.length === 0 ? (
        <div className="theme-surface rounded-2xl p-10 text-center">
          <p className="theme-text-soft text-base">No active contests right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {activeParticipations.map((participation) => {
            const contest = getContestFromParticipation(participation);
            const contestId = contest?._id || contest?.id;

            if (!contestId) {
              return null;
            }

            const normalizedParticipation = {
              ...participation,
              contest,
            };

            const isTeamParticipation =
              participation?.participationType === "team" ||
              contest?.participationType === "team";
            const isLeader =
              String(participation?.team?.leader?._id || "") === String(currentUserId || "");
            const canSubmit = !isTeamParticipation || isLeader;
            const daysLeft = getDaysLeft(contest?.deadline);

            return (
              <article
                key={participation?._id || contestId}
                onClick={() => setSelectedContest(normalizedParticipation)}
                className="theme-surface theme-card-hover cursor-pointer overflow-hidden rounded-2xl"
              >
                <div className="relative h-44 overflow-hidden sm:h-48">
                  <img
                    src={contest?.image || "/default.jpg"}
                    alt={contest?.title || "Contest"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                      {isTeamParticipation ? "Team" : "Solo"}
                    </span>
                    {daysLeft !== null && (
                      <span className="rounded-full bg-[#82c600]/90 px-2.5 py-1 text-[11px] font-semibold text-slate-950">
                        {daysLeft > 0
                          ? `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`
                          : "Ending soon"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-4 p-4 sm:p-5">
                  <div>
                    <h2 className="theme-text line-clamp-2 text-base font-semibold sm:text-lg">
                      {contest?.title || "Untitled contest"}
                    </h2>
                    <p className="theme-text-soft mt-2 line-clamp-2 text-sm leading-6">
                      {contest?.description || "No contest description available."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="theme-surface-muted rounded-xl p-3">
                      <p className="theme-text-muted text-[11px] uppercase tracking-[0.12em]">
                        Mode
                      </p>
                      <p className="theme-text mt-1 flex items-center gap-1.5 text-sm font-medium capitalize">
                        {isTeamParticipation ? <FiUsers size={14} /> : <FiUser size={14} />}
                        {isTeamParticipation ? "Team" : "Solo"}
                      </p>
                    </div>
                    <div className="theme-surface-muted rounded-xl p-3">
                      <p className="theme-text-muted text-[11px] uppercase tracking-[0.12em]">
                        Deadline
                      </p>
                      <p className="theme-text mt-1 flex items-center gap-1.5 text-sm font-medium">
                        <FiClock size={14} />
                        {contest?.deadline
                          ? new Date(contest.deadline).toLocaleDateString()
                          : "TBA"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p
                      className={`text-xs font-medium ${
                        canSubmit ? "text-emerald-500" : "text-amber-500"
                      }`}
                    >
                      {canSubmit
                        ? "Submission enabled"
                        : "Only team leader can submit"}
                    </p>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        if (!canSubmit) {
                          return;
                        }

                        navigate(`/student/submit/${contestId}`);
                      }}
                      disabled={!canSubmit}
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                        canSubmit
                          ? "theme-brand-button"
                          : "cursor-not-allowed border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] text-[var(--theme-text-muted)] opacity-70"
                      }`}
                    >
                      Submit
                      <FiArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <ContestPreviewModal
        selectedContest={selectedContest}
        onClose={() => setSelectedContest(null)}
      />
    </div>
  );
};

export default MyActiveContestsPage;
