import { useState, useMemo } from "react";
import { MoreVertical, Search } from "lucide-react";

const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-[#82C600]/20 text-[#82C600]",
    draft: "bg-gray-200 text-gray-600",
    evaluating: "bg-blue-100 text-blue-600",
  };

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status.toUpperCase()}
    </span>
  );
};

const ITEMS_PER_PAGE = 3;

const ActiveContestPipeline = ({
  data = [],
  total = 0,
  onRowClick = () => {},
}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  // 🔍 Search + Filter Logic
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search
    if (search) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter
    if (filter !== "all") {
      result = result.filter((item) => item.status === filter);
    }

    return result;
  }, [data, search, filter]);

  // 📄 Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, page]);

  return (
    <div className="bg-[#f8fafc] p-5 rounded-2xl shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-gray-800 text-lg">
            Active Contest Pipeline
          </h2>
          <p className="text-sm text-gray-400">
            Real-time status of current academic challenges
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex gap-2">
          {/* Search */}
          <div className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search contests..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="outline-none text-sm"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-white border rounded-lg text-sm"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="evaluating">Evaluating</option>
          </select>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-5 text-xs text-gray-400 px-3 py-2">
        <span>CONTEST TITLE</span>
        <span>DATE WINDOW</span>
        <span>PARTICIPANTS</span>
        <span>STATUS</span>
        <span className="text-right">ACTIONS</span>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {paginatedData.length === 0 ? (
          <p className="text-center text-gray-400 py-6">
            No contests found
          </p>
        ) : (
          paginatedData.map((item, index) => (
            <div
              key={index}
              onClick={() => onRowClick(item)}
              className="grid grid-cols-5 items-center bg-white p-3 rounded-xl border border-gray-100 hover:shadow-md hover:bg-[#82C600]/5 transition cursor-pointer"
            >
              {/* Title */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#82C600]/10 text-[#82C600] flex items-center justify-center">
                  {item.icon || "📘"}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div>
                <p className="text-sm text-gray-700">{item.date}</p>
                <p className="text-xs text-gray-400">{item.remaining}</p>
              </div>

              {/* Participants */}
              <div className="text-sm text-gray-700 font-medium">
                {item.participants}
              </div>

              {/* Status */}
              <div>
                <StatusBadge status={item.status} />
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <MoreVertical className="text-gray-400" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <p>
          Showing {paginatedData.length} of {filteredData.length} (Total: {total})
        </p>

        {/* Pagination */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded ${
                page === i + 1
                  ? "bg-[#82C600] text-white"
                  : "bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveContestPipeline;