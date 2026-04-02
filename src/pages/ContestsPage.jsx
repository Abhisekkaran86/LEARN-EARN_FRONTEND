import Card from "../components/ui/Card";
import { challenges } from "../data/challengesData";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ContestsPage = () => {
  const navigate = useNavigate();

  const token = Cookies.get("token");
  const isLoggedIn = !!token;

  // ✅ HANDLE PARTICIPATE CLICK
  const handleParticipate = (item) => {
    if (!isLoggedIn) {
      navigate("/login"); // 🔥 redirect if not logged in
    } else {
      // 🔥 future: go to contest details page
      navigate(`/contest/${item.id}`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#f8fafc] to-[#eef2f7] min-h-screen px-4 md:px-8 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Explore <span className="text-[#82C600]">Contests</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Participate, compete, and improve your skills 🚀
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {challenges.map((item) => (
          <Card
            key={item.id}
            className="group overflow-hidden rounded-2xl p-0 bg-white/70 backdrop-blur-md border border-white/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            
            {/* IMAGE */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-[#FFD700] text-black font-semibold shadow">
                {item.prize}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-5">
              <span className="text-xs font-semibold text-[#82C600] bg-[#82C600]/10 px-2 py-1 rounded">
                {item.category}
              </span>

              <h3 className="mt-3 text-lg font-bold text-gray-800 group-hover:text-[#82C600] transition">
                {item.title}
              </h3>

              {/* 🔥 BUTTON */}
              <button
                onClick={() => handleParticipate(item)}
                className="mt-5 w-full bg-[#82C600] hover:bg-[#6da800] text-white py-2.5 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
              >
                Participate
              </button>
            </div>

          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContestsPage;