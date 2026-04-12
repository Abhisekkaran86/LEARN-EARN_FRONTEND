

import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaTrophy, FaUser, FaUsers } from "react-icons/fa";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContests } from "@/features/contest/contestSlice";

const ContestsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { contests = [] } = useSelector((state) => state.contest);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token;

  useEffect(() => {
    dispatch(fetchContests());
  }, [dispatch]);

  const handleParticipate = (item) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (role === "student") {
      navigate(`/student/contest/${item._id}`);
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] px-3 sm:px-4 md:px-6 lg:px-10 py-6 md:py-10">

      {/* HEADER */}
      <div className="mb-8 md:mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
          Discover Contests
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Compete, win rewards, and grow 🚀
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

        {contests.map((item) => {
          const daysLeft = Math.ceil(
            (new Date(item.deadline) - new Date()) / (1000 * 60 * 60 * 24)
          );

          return (
            <div
              key={item._id}
              onClick={() => navigate(`/contest/${item._id}`)}
              className="group relative rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 cursor-pointer"
            >

              {/* IMAGE */}
              <div className="relative h-44 md:h-52 overflow-hidden">

                <img
                  src={item.image || "https://via.placeholder.com/400"}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* STATUS (TOP LEFT) */}
                <div className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-semibold 
                bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white shadow">
                  {item.status || "Active"}
                </div>

                {/* REWARD (TOP RIGHT) */}
                <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1">
                  <FaTrophy />
                  {item.rewards?.[0] || "Reward"}
                </div>

                {/* 🔥 PARTICIPATION TYPE (FIXED PREMIUM POSITION) */}
                <div className="absolute bottom-12 left-3">

                  {item.participationType === "solo" && (
                    <div className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full 
                    bg-white/90 backdrop-blur-md shadow-md text-gray-800 font-semibold border border-white/40">
                      <FaUser className="text-[#82C600]" />
                      Solo
                    </div>
                  )}

                  {item.participationType === "team" && (
                    <div className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full 
                    bg-white/90 backdrop-blur-md shadow-md text-gray-800 font-semibold border border-white/40">
                      <FaUsers className="text-blue-500" />
                      Team
                    </div>
                  )}

                  {item.participationType === "both" && (
                    <div className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full 
                    bg-white/90 backdrop-blur-md shadow-md text-gray-800 font-semibold border border-white/40">
                      <FaUser className="text-[#82C600]" />
                      <FaUsers className="text-blue-500" />
                      Both
                    </div>
                  )}

                </div>

                {/* TITLE (BOTTOM CLEAN) */}
                <h3 className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm sm:text-base md:text-lg leading-tight">
                  {item.title}
                </h3>

              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col justify-between">

                <p className="text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs bg-[#82C600]/10 text-[#82C600] px-2 py-1 rounded">
                    {item.category || "General"}
                  </span>

                  {item.level && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {item.level}
                    </span>
                  )}
                </div>

                {/* TIME */}
                <p className="text-xs text-red-500 mt-2">
                  ⏳ {daysLeft > 0 ? `${daysLeft} days left` : "Ended"}
                </p>

                {/* STATS */}
                <div className="grid grid-cols-2 gap-3 mt-4 text-xs">

                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-gray-400">Start</p>
                    <p className="font-semibold">
                      {new Date(item.startDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-gray-400">Deadline</p>
                    <p className="font-semibold">
                      {new Date(item.deadline).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl col-span-2">
                    <p className="text-gray-400">Participants</p>
                    <p className="font-semibold">
                      👥 {item.participants?.length || 0}+ Joined
                    </p>

                    <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                      <div
                        className="bg-gradient-to-r from-[#82C600] to-[#a3e635] h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            (item.participants?.length || 0) * 10,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleParticipate(item);
                  }}
                  className="mt-5 w-full flex items-center justify-center gap-2 text-sm 
                  bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white py-2.5 rounded-xl 
                  font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition"
                >
                  View Details <FaArrowRight />
                </button>

              </div>

              {/* GLOW */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#82c600]/10 to-[#a3e635]/10 opacity-0 group-hover:opacity-100 transition"></div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContestsPage;
