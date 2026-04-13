import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import AdminContestManager from "@/features/admin/components/AdminContestManager";
import {
  deleteContest,
  fetchContests,
  updateContest,
} from "@/features/contest/contestSlice";

const getContestId = (contest) => contest?._id || contest?.id || null;

const toDateInputValue = (value) => {
  if (!value) {
    return "";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toISOString().split("T")[0];
};

const normaliseRewards = (rewards) => {
  const source = Array.isArray(rewards) ? rewards : [rewards];

  return source
    .flatMap((reward) => String(reward || "").split(","))
    .map((reward) => reward.trim())
    .filter(Boolean);
};

const getErrorMessage = (error, fallbackMessage) =>
  error?.message || error?.error || fallbackMessage;

const ContestAdminPage = () => {
  const dispatch = useDispatch();
  const { contests = [], loading } = useSelector((state) => state.contest);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchContests());
  }, [dispatch]);

  const tableData = useMemo(
    () =>
      contests.map((contest) => ({
        id: getContestId(contest),
        _id: getContestId(contest),
        title: contest.title || "Untitled contest",
        description: contest.description || "",
        startDate: contest.startDate || "",
        deadline: contest.deadline || "",
        participants: Array.isArray(contest.users)
          ? contest.users.length
          : Array.isArray(contest.participants)
            ? contest.participants.length
            : 0,
        status: contest.status || "upcoming",
        rewards: normaliseRewards(contest.rewards),
        participationType:
          contest.participationType === "team" ? "team" : "solo",
        maxTeamSize: contest.maxTeamSize || 1,
      })),
    [contests]
  );

  const filteredContests = useMemo(() => {
    return tableData.filter((contest) => {
      const matchesSearch = contest.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ? true : contest.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [filter, search, tableData]);

  const handleDelete = async (contestId) => {
    if (!contestId) {
      toast.error("Invalid contest ID");
      return;
    }

    const confirmed = window.confirm(
      "Delete this contest? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteContest(contestId)).unwrap();
      toast.success("Contest deleted");

      if (selectedItem?.id === contestId) {
        setSelectedItem(null);
        setIsEditOpen(false);
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Delete failed"));
    }
  };

  const handleEdit = (contest) => {
    setSelectedItem({
      ...contest,
      startDate: toDateInputValue(contest.startDate),
      deadline: toDateInputValue(contest.deadline),
      rewardsText: normaliseRewards(contest.rewards).join(", "),
      maxTeamSize: String(contest.maxTeamSize || 1),
    });
    setIsEditOpen(true);
  };

  const handleSave = async () => {
    const contestId = selectedItem?.id;
    const rewards = normaliseRewards(selectedItem?.rewardsText);
    const startDate = new Date(selectedItem?.startDate);
    const deadline = new Date(selectedItem?.deadline);

    if (!contestId) {
      toast.error("Invalid contest ID");
      return;
    }

    if (
      !selectedItem?.title?.trim() ||
      !selectedItem?.description?.trim() ||
      !selectedItem?.startDate ||
      !selectedItem?.deadline ||
      rewards.length === 0
    ) {
      toast.error("Title, description, dates, and rewards are required");
      return;
    }

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(deadline.getTime())) {
      toast.error("Please enter valid contest dates");
      return;
    }

    if (startDate >= deadline) {
      toast.error("Deadline must be later than the start date");
      return;
    }

    if (
      selectedItem?.participationType === "team" &&
      Number(selectedItem?.maxTeamSize) < 2
    ) {
      toast.error("Team contests require a max team size of at least 2");
      return;
    }

    setIsSaving(true);

    try {
      await dispatch(
        updateContest({
          id: contestId,
          data: {
            title: selectedItem.title.trim(),
            description: selectedItem.description.trim(),
            startDate: selectedItem.startDate,
            deadline: selectedItem.deadline,
            participationType: selectedItem.participationType || "solo",
            maxTeamSize:
              selectedItem.participationType === "team"
                ? Number(selectedItem.maxTeamSize)
                : 1,
            rewards,
          },
        })
      ).unwrap();

      toast.success("Contest updated");
      setIsEditOpen(false);
      setSelectedItem(null);
    } catch (error) {
      toast.error(getErrorMessage(error, "Update failed"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full overflow-x-auto">
        <AdminContestManager
          contests={filteredContests}
          loading={loading}
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          onSave={handleSave}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
};

export default ContestAdminPage;
