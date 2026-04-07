import { X } from "lucide-react";

const DashboardModal = ({ isOpen, onClose, data = [], title, loading }) => {
  if (!isOpen) return null;

  const renderRow = (item) => {
    if (title === "TOTAL USERS") {
      return (
        <>
          <div className="font-medium text-gray-800">{item.name}</div>
          <div className="text-gray-500 text-sm">{item.email}</div>
          <div>
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
              {item.role}
            </span>
          </div>
        </>
      );
    }

    if (title === "ACTIVE CONTESTS") {
      return (
        <>
          <div className="font-medium text-gray-800">{item.title}</div>
          <div className="text-gray-500 text-sm">{item.startDate}</div>
          <div>
            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
              {item.status}
            </span>
          </div>
        </>
      );
    }

    if (title === "TOTAL SUBMISSIONS") {
      return (
        <>
          <div className="text-gray-800">{item.userId}</div>
          <div className="text-gray-500 text-sm">{item.contestId}</div>
          <div>
            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
              {item.status}
            </span>
          </div>
        </>
      );
    }

    return <pre>{JSON.stringify(item, null, 2)}</pre>;
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[95%] max-w-4xl max-h-[85vh] rounded-2xl shadow-xl overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto flex-1">

          {loading ? (
            <div className="text-center py-20 text-gray-500">
              Loading data...
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              No data available
            </div>
          ) : (
            <div className="space-y-3">

              {/* TABLE HEADER */}
              <div className="grid grid-cols-3 text-sm font-semibold text-gray-500 border-b pb-2">
                <div>Info</div>
                <div>Details</div>
                <div>Status</div>
              </div>

              {/* DATA ROWS */}
              {data.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 items-center p-3 rounded-xl hover:bg-gray-50 transition border"
                >
                  {renderRow(item)}
                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardModal;