const DashboardModal = ({ isOpen, onClose, data = [], title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[500px] max-h-[80vh] rounded-xl shadow-lg p-5 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Data */}
        {data.length === 0 ? (
          <p className="text-gray-500">No data found</p>
        ) : (
          <div className="space-y-2">
            {data.map((item, i) => (
              <div
                key={i}
                className="p-3 border rounded-lg hover:bg-gray-50"
              >
                {item.name || item.title || JSON.stringify(item)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardModal;