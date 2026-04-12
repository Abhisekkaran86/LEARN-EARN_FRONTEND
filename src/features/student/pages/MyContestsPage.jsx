


// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const MyActiveContestsPage = () => {
//   const navigate = useNavigate();

//   const [myParticipations, setMyParticipations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ================= FETCH PARTICIPATIONS =================
//   useEffect(() => {
//     const fetchMyParticipations = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await axios.get(
//           "https://learn-earn-contest-3.onrender.com/api/v1/participations/my-participations",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setMyParticipations(res.data.participations || []);
//       } catch (err) {
//         console.error(err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyParticipations();
//   }, []);

//   // ================= FILTER ACTIVE =================
//   const activeParticipations = myParticipations.filter((item) => {
//     const deadline = new Date(item?.contest?.deadline);
//     return deadline > new Date(); // ✅ only active
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] p-6">

//       {/* HEADER */}
//       <div className="max-w-7xl mx-auto mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           🎯 My Active Contests
//         </h1>
//         <p className="text-gray-500 mt-1">
//           All contests you are currently participating in
//         </p>
//       </div>

//       {/* CONTENT */}
//       <div className="max-w-7xl mx-auto">

//         {loading ? (
//           <p className="text-gray-400 text-center mt-20">Loading...</p>
//         ) : activeParticipations.length === 0 ? (
//           <div className="bg-white p-12 rounded-2xl text-center shadow">
//             <p className="text-gray-400 text-lg">
//               🚫 No active contests
//             </p>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//             {activeParticipations.map((item) => {
//               const contest = item.contest;

//               return (
//                 <div
//                   key={item._id}
//                   className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
//                 >

//                   {/* IMAGE */}
//                   <div
//                     className="h-40 bg-cover bg-center group-hover:scale-105 transition"
//                     style={{
//                       backgroundImage: `url(${contest?.image || "/default.jpg"})`,
//                     }}
//                   />

//                   {/* BODY */}
//                   <div className="p-5">

//                     {/* TAG */}
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
//                         🟢 Active
//                       </span>

//                       <span className="text-xs text-gray-400">
//                         {new Date(contest?.deadline).toLocaleDateString()}
//                       </span>
//                     </div>

//                     {/* TITLE */}
//                     <h2 className="font-semibold text-gray-800 text-lg line-clamp-2">
//                       {contest?.title}
//                     </h2>

//                     {/* DESC */}
//                     <p className="text-sm text-gray-500 mt-2 line-clamp-2">
//                       {contest?.description}
//                     </p>

//                     {/* ACTION */}
//                     <div className="mt-4 flex justify-between items-center">

//                       <span className="text-xs text-gray-500">
//                         ⏳ Ongoing
//                       </span>

//                       <button
//                         onClick={() =>
//                           navigate(`/student/submit/${contest._id}`)
//                         }
//                         className="px-4 py-1 text-xs bg-[#82C600] text-white rounded-lg hover:bg-[#6fa800]"
//                       >
//                         Submit
//                       </button>

//                     </div>

//                   </div>

//                 </div>
//               );
//             })}

//           </div>
//         )}

//       </div>

//     </div>
//   );
// };

// export default MyActiveContestsPage;




// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import API from "../../../services/axios";

// const MyActiveContestsPage = () => {
//   const navigate = useNavigate();

//   const [myParticipations, setMyParticipations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ================= FETCH PARTICIPATIONS =================
//   useEffect(() => {
//     const fetchMyParticipations = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await API.get(
//           "/participations/my-participations",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setMyParticipations(res.data.participations || []);
//       } catch (err) {
//         console.error(err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyParticipations();
//   }, []);

//   // ================= FILTER ACTIVE =================
//   const activeParticipations = myParticipations.filter((item) => {
//     const deadline = new Date(item?.contest?.deadline);
//     return deadline > new Date();
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] p-6">

//       {/* HEADER */}
//       <div className="max-w-7xl mx-auto mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           🎯 My Active Contests
//         </h1>
//         <p className="text-gray-500 mt-1">
//           All contests you are currently participating in
//         </p>
//       </div>

//       {/* CONTENT */}
//       <div className="max-w-7xl mx-auto">

//         {loading ? (
//           <p className="text-gray-400 text-center mt-20">Loading...</p>
//         ) : activeParticipations.length === 0 ? (
//           <div className="bg-white p-12 rounded-2xl text-center shadow">
//             <p className="text-gray-400 text-lg">
//               🚫 No active contests
//             </p>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//             {activeParticipations.map((item) => {
//               const contest = item.contest;

//               return (
//                 <div
//                   key={item._id}
//                   className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
//                 >

//                   {/* IMAGE */}
//                   <div
//                     className="h-40 bg-cover bg-center group-hover:scale-105 transition"
//                     style={{
//                       backgroundImage: `url(${contest?.image || "/default.jpg"})`,
//                     }}
//                   />

//                   {/* BODY */}
//                   <div className="p-5">

//                     {/* TAG */}
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
//                         🟢 Active
//                       </span>

//                       <span className="text-xs text-gray-400">
//                         {new Date(contest?.deadline).toLocaleDateString()}
//                       </span>
//                     </div>

//                     {/* TITLE */}
//                     <h2 className="font-semibold text-gray-800 text-lg line-clamp-2">
//                       {contest?.title}
//                     </h2>

//                     {/* DESC */}
//                     <p className="text-sm text-gray-500 mt-2 line-clamp-2">
//                       {contest?.description}
//                     </p>

//                     {/* ACTION */}
//                     <div className="mt-4 flex justify-between items-center">

//                       <span className="text-xs text-gray-500">
//                         ⏳ Ongoing
//                       </span>

//                       <button
//                         onClick={() =>
//                           navigate(`/student/submit/${contest._id}`)
//                         }
//                         className="px-4 py-1 text-xs bg-[#82C600] text-white rounded-lg hover:bg-[#6fa800]"
//                       >
//                         Submit
//                       </button>

//                     </div>

//                   </div>

//                 </div>
//               );
//             })}

//           </div>
//         )}

//       </div>

//     </div>
//   );
// };

// export default MyActiveContestsPage;

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../../services/axios";
import ContestModal from "../ContestModal";

const MyActiveContestsPage = () => {
  const navigate = useNavigate();

  const [myParticipations, setMyParticipations] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ NEW STATE (MODAL)
  const [selectedContest, setSelectedContest] = useState(null);

  useEffect(() => {
    const fetchMyParticipations = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get(
          "/participations/my-participations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMyParticipations(res.data.participations || []);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyParticipations();
  }, []);

  const activeParticipations = myParticipations.filter((item) => {
    const deadline = new Date(item?.contest?.deadline);
    return deadline > new Date();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] p-6">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          🎯 My Active Contests
        </h1>
      </div>

      <div className="max-w-7xl mx-auto">

        {loading ? (
          <p className="text-center mt-20">Loading...</p>
        ) : activeParticipations.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center shadow">
            No active contests
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {activeParticipations.map((item) => {
              const contest = item.contest;

              return (
                <div
                  key={item._id}
                  onClick={() => setSelectedContest(item)} // ✅ CLICK
                  className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition"
                >
                  <div
                    className="h-40 bg-cover"
                    style={{
                      backgroundImage: `url(${contest?.image || "/default.jpg"})`,
                    }}
                  />

                  <div className="p-5">
                    <h2 className="font-semibold">{contest?.title}</h2>
                    <p className="text-sm text-gray-500 mt-2">
                      {contest?.description}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>
      <ContestModal
        selectedContest={selectedContest}
        onClose={() => setSelectedContest(null)}
      />




    </div>
  );
};

export default MyActiveContestsPage;