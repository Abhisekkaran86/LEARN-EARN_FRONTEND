import { useEffect, useState } from "react";
import API from "../../../services/axios";
import ContestPreviewModal from "../ContestPreviewModal";
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
    <div className="theme-page-shell min-h-screen p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="theme-text text-3xl font-semibold">
          📜 My Contest History
        </h1>
        <p className="theme-text-soft mt-1 text-sm">
          All your past and current participations
        </p>
      </div>

      <div className="max-w-6xl mx-auto">

        {loading ? (
          <p className="text-center text-gray-400 mt-20">
            Loading...
          </p>
        ) : history.length === 0 ? (
          <div className="theme-surface rounded-2xl p-10 text-center">
            <p className="theme-text-soft">
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
                  className="theme-surface theme-card-hover cursor-pointer overflow-hidden rounded-3xl group"
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

                      <span className="theme-text-muted flex items-center gap-1 text-xs">
                        <FiClock />
                        {new Date(contest.deadline).toLocaleDateString()}
                      </span>

                    </div>

                    {/* TITLE */}
                    <h2 className="theme-text line-clamp-2 font-semibold">
                      {contest.title}
                    </h2>

                    {/* PARTICIPATION */}
                    <div className="theme-text-soft flex items-center gap-2 text-xs">
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
      <ContestPreviewModal
        selectedContest={selectedContest}
        onClose={() => setSelectedContest(null)}
      />

    </div>
  );
};

export default MyHistory;
