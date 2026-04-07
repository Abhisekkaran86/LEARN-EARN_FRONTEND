import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrophy, FaUsers, FaCalendarAlt } from "react-icons/fa";

const MyContestsPage = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ✅ added

  useEffect(() => {
    const fetchMy = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://learn-earn-contest-2.onrender.com/api/v1/participations/my-participations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API RESPONSE:", res.data);

        setContests(res.data.participations || []);
      } catch (err) {
        console.error("ERROR:", err.response?.data || err.message);

        if (err.response?.status === 401) {
          alert("Session expired. Please login again ❌");
        }
      } finally {
        setLoading(false); // ✅ FIX loading
      }
    };

    fetchMy();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaTrophy className="text-[#82C600]" />
          My Contests
        </h1>
        <p className="text-gray-500 mt-1">
          View all contests you have participated in
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-400 mt-20">
          Loading contests...
        </div>
      )}

      {/* EMPTY */}
      {!loading && contests.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl shadow">
          <p className="text-gray-400 text-lg">
            🚫 No contests joined yet
          </p>
        </div>
      )}

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {contests.map((item) => {
          const contest = item.contest;
          console.log("NAV ID:", item.contest?._id);

          return (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition border overflow-hidden group"
            >

              {/* IMAGE */}
              <div
                className="h-40 bg-cover bg-center group-hover:scale-105 transition"
                style={{
                  backgroundImage: `url(${contest?.image || "/default.jpg"})`,
                }}
              />

              {/* BODY */}
              <div className="p-5">

                {/* TAGS */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-[#82C600]/10 text-[#82C600] px-2 py-1 rounded">
                    {contest?.category || "Contest"}
                  </span>

                  <span className="text-xs bg-yellow-200 text-black px-2 py-1 rounded">
                    {contest?.status || "Live"}
                  </span>
                </div>

                {/* TITLE */}
                <h2 className="font-semibold text-gray-800 text-lg line-clamp-2">
                  {contest?.title}
                </h2>

                {/* DESC */}
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {contest?.description}
                </p>

                {/* DATES */}
                <div className="mt-4 space-y-1 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt />
                    Start: {new Date(contest?.startDate).toLocaleDateString()}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt />
                    Deadline: {new Date(contest?.deadline).toLocaleDateString()}
                  </p>
                </div>

                {/* FOOTER */}
                <div className="mt-4 flex justify-between items-center">

                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <FaUsers />
                    {contest?.users?.length || 0}
                  </div>

                  <div className="flex items-center gap-2">

                    <span className="text-xs font-medium text-[#82C600]">
                      ✅ Joined
                    </span>

                    {/* 🔥 SUBMIT BUTTON */}
                    <button
                      onClick={() => navigate(`/student/submit/${item.contest._id}`)}
                      className="px-3 py-1 text-xs bg-[#82C600] text-white rounded-lg hover:bg-[#6fa800]"
                    >
                      Submit
                    </button>

                  </div>

                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default MyContestsPage;