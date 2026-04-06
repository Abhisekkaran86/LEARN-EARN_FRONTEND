const DashboardModal = ({ open, onClose, title, data }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-4xl rounded-2xl p-6 shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
        </div>

        {/* Table */}
        <div className="max-h-[400px] overflow-y-auto">
          {data.length === 0 ? (
            <p className="text-gray-500">No data found</p>
          ) : (
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Info</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-2">{item.name || item.title || "-"}</td>
                    <td className="p-2">
                      {item.email || item.status || item.description || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardModal;