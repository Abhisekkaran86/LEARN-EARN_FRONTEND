
import { MoreVertical, Search } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

import ContestTable from "../componnent/ContestTable";

const ActiveContestUI = ({
  data = [],
  loading,
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
}) => {

  // ✅ ONLY FILTER (NO PAGINATION)
  const filteredData = data
    ?.filter((item) =>
      (item?.title || "")
        .toLowerCase()
        .includes((search || "").toLowerCase())
    )
    ?.filter((item) =>
      filter === "all" ? true : item?.status === filter
    );

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-400">
        Loading contests...
      </p>
    );
  }

  return (
    <div className="bg-[#f8fafc] p-5 rounded-2xl shadow-sm">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-4">

        <div>
          <h2 className="font-semibold text-gray-800 text-lg">
            Active Contest Pipeline
          </h2>
          <p className="text-sm text-gray-400">
            Real-time status of current academic challenges
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex gap-2">

          <div className="flex items-center bg-white px-3 py-2 rounded-lg border">
            <Search size={16} className="text-gray-400 mr-2" />

            <input
              type="text"
              placeholder="Search contests..."
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-sm"
            />
          </div>

          <select
            value={filter || "all"}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-white border rounded-lg text-sm"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="evaluating">Evaluating</option>
          </select>

        </div>
      </div>

      {/* ✅ TABLE (FULL DATA, NO SLICE) */}
      <ContestTable
        data={filteredData}
        onDelete={onDelete}
        onEdit={onEdit}
      />

      {/* 🔥 ✅ SAME MODAL (UNCHANGED DESIGN) */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

          <div className="bg-white w-[450px] rounded-2xl shadow-xl p-6">

            {/* HEADER */}
            <div className="mb-5 border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-800">
                ✏️ Edit Contest
              </h2>
              <p className="text-sm text-gray-400">
                Update all contest details
              </p>
            </div>

            {/* FORM */}
            <div className="space-y-4">

              {/* TITLE */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Title
                </label>
                <Input
                  value={selectedItem?.title || ""}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              {/* START DATE */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={
                    selectedItem?.startDate
                      ? new Date(selectedItem.startDate)
                        .toISOString()
                        .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>

              {/* DEADLINE */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Deadline
                </label>
                <Input
                  type="date"
                  value={
                    selectedItem?.deadline
                      ? new Date(selectedItem.deadline)
                        .toISOString()
                        .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      deadline: e.target.value, // ✅ FIX
                    })
                  }
                />
              </div>

              {/* PARTICIPANTS */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Participants
                </label>
                <Input
                  type="number"
                  value={selectedItem?.participants || 0}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      participants: Number(e.target.value),
                    })
                  }
                />
              </div>

              {/* STATUS */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Status
                </label>
                <select
                  value={selectedItem?.status || "upcoming"}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      status: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-2 text-sm"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="active">Active</option>
                  <option value="complete">Complete</option>
                </select>
              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-3 mt-6 border-t pt-4">

              <Button onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>

              <Button variant="primary" onClick={onSave}>
                💾 Save Changes
              </Button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ActiveContestUI;