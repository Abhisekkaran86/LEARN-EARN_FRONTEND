import { Search } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ContestTable from "@/features/admin/components/ContestTable";

const AdminContestManager = ({
  contests = [],
  loading = false,
  search,
  setSearch,
  filter,
  setFilter,
  onEdit,
  onDelete,
  isEditOpen,
  setIsEditOpen,
  selectedItem,
  setSelectedItem,
  onSave,
  isSaving = false,
}) => {
  if (loading) {
    return (
      <p className="py-10 text-center text-gray-400">
        Loading contests...
      </p>
    );
  }

  return (
    <div className="rounded-2xl bg-[#f8fafc] p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-800 sm:text-lg">
            Contest Management
          </h2>
          <p className="text-xs text-gray-400 sm:text-sm">
            Search, update, or delete contests from the admin panel
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <div className="flex w-full items-center rounded-lg border bg-white px-3 py-2 sm:w-auto">
            <Search size={16} className="mr-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contests..."
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm outline-none"
            />
          </div>

          <select
            value={filter || "all"}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full rounded-lg border bg-white px-3 py-2 text-sm sm:w-auto"
          >
            <option value="all">All Statuses</option>
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <ContestTable
          data={contests}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 py-6 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-4 shadow-xl sm:p-6">
            <div className="mb-5 border-b pb-3">
              <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
                Edit Contest
              </h2>
              <p className="text-xs text-gray-400 sm:text-sm">
                Update the fields supported by your backend contest API
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Title
                </label>
                <Input
                  value={selectedItem?.title || ""}
                  onChange={(e) =>
                    setSelectedItem((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Description
                </label>
                <textarea
                  value={selectedItem?.description || ""}
                  onChange={(e) =>
                    setSelectedItem((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#82c600]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={selectedItem?.startDate || ""}
                  onChange={(e) =>
                    setSelectedItem((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Deadline
                </label>
                <Input
                  type="date"
                  value={selectedItem?.deadline || ""}
                  onChange={(e) =>
                    setSelectedItem((prev) => ({
                      ...prev,
                      deadline: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Participation Type
                </label>
                <select
                  value={selectedItem?.participationType || "solo"}
                  onChange={(e) =>
                    setSelectedItem((prev) => ({
                      ...prev,
                      participationType: e.target.value,
                      maxTeamSize:
                        e.target.value === "solo"
                          ? "1"
                          : prev?.maxTeamSize || "2",
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#82c600]"
                >
                  <option value="solo">Solo</option>
                  <option value="team">Team</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Max Team Size
                </label>
                <Input
                  type="number"
                  min={selectedItem?.participationType === "team" ? "2" : "1"}
                  disabled={selectedItem?.participationType !== "team"}
                  value={
                    selectedItem?.participationType === "team"
                      ? selectedItem?.maxTeamSize || "2"
                      : "1"
                  }
                  onChange={(e) =>
                    setSelectedItem((prev) => ({
                      ...prev,
                      maxTeamSize: e.target.value,
                    }))
                  }
                  className={
                    selectedItem?.participationType !== "team"
                      ? "cursor-not-allowed bg-gray-100"
                      : ""
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Rewards
                </label>
                <textarea
                  value={selectedItem?.rewardsText || ""}
                  onChange={(e) =>
                    setSelectedItem((prev) => ({
                      ...prev,
                      rewardsText: e.target.value,
                    }))
                  }
                  rows={3}
                  placeholder="1st prize, 2nd prize, Certificate"
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#82c600]"
                />
                <p className="mt-2 text-xs text-gray-400">
                  Separate each reward with a comma.
                </p>
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Current Status
                </label>
                <div className="mt-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                  {selectedItem?.status || "upcoming"}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:justify-end">
              <Button
                type="button"
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="primary"
                onClick={onSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContestManager;
