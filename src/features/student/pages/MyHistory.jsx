import { useEffect, useState } from "react";
import API from "../../../services/axios";
import ContestModal from "../ContestModal";
import { FiClock, FiUsers, FiUser } from "react-icons/fi";

const MyHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContest, setSelectedContest] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get(
          "/participations/my-participations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setHistory(res.data.participations || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          📜 My Contest History
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          All your past and current participations
        </p>
      </div>

      <div className="max-w-6xl mx-auto">

        {loading ? (
          <p className="text-center text-gray-400 mt-20">
            Loading...
          </p>
        ) : history.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl text-center shadow">
            <p className="text-gray-400">
              No history found 🚫
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {history.map((item) => {
              const contest = item.contest;

              return (
                <div
                  key={item._id}
                  onClick={() => setSelectedContest(item)}
                  className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer group"
                >

                  {/* IMAGE */}
                  <div
                    className="h-40 bg-cover bg-center group-hover:scale-105 transition"
                    style={{
                      backgroundImage: `url(${contest?.image})`,
                    }}
                  />

                  {/* BODY */}
                  <div className="p-5 space-y-3">

                    {/* STATUS */}
                    <div className="flex justify-between items-center">

                      <span
                        className={`flex items-center gap-2 text-xs font-medium
                          ${contest.status === "active"
                            ? "text-green-600"
                            : contest.status === "completed"
                            ? "text-blue-600"
                            : "text-gray-500"}
                        `}
                      >
                        <span
                          className={`w-2 h-2 rounded-full
                            ${contest.status === "active"
                              ? "bg-green-500"
                              : contest.status === "completed"
                              ? "bg-blue-500"
                              : "bg-gray-400"}
                          `}
                        ></span>

                        {contest.status}
                      </span>

                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <FiClock />
                        {new Date(contest.deadline).toLocaleDateString()}
                      </span>

                    </div>

                    {/* TITLE */}
                    <h2 className="font-semibold text-gray-800 line-clamp-2">
                      {contest.title}
                    </h2>

                    {/* PARTICIPATION */}
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      {item.participationType === "team" ? (
                        <>
                          <FiUsers />
                          {item.team?.teamName}
                        </>
                      ) : (
                        <>
                          <FiUser />
                          Solo Participation
                        </>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* MODAL */}
      <ContestModal
        selectedContest={selectedContest}
        onClose={() => setSelectedContest(null)}
      />

    </div>
  );
};

export default MyHistory;