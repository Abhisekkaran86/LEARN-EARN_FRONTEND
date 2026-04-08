
// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";

// import ContestFormSection from "../componnent/ContestFormSection";
// import ContestSidebar from "../componnent/ContestSidebar";

// import {
//   createContest,
//   fetchContests,
// } from "../../../features/contestSlice";

// import Button from "../../../components/ui/Button";

// const CreateContestView = () => {
//   const dispatch = useDispatch();

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     startDate: "",
//     deadline: "",
//   });

//   const [requirements, setRequirements] = useState([]);
//   const [prizes, setPrizes] = useState([]);
//   const [banner, setBanner] = useState(null);

//   // 🔥 SAME FUNCTIONALITY (unchanged)
//   useEffect(() => {
//     dispatch(fetchContests());
//   }, [dispatch]);

//   // 🔥 SAME FUNCTIONALITY (only Redux call fixed)
//   const handleCreate = async () => {
//     try {
//       if (
//         !form.title ||
//         !form.description ||
//         !form.startDate ||
//         !form.deadline
//       ) {
//         toast.error("All fields are required");
//         return;
//       }

//       const formData = new FormData();

//       formData.append("title", form.title.trim());
//       formData.append("description", form.description.trim());
//       formData.append("startDate", form.startDate);
//       formData.append("deadline", form.deadline);

//       formData.append(
//         "requirements",
//         Array.isArray(requirements)
//           ? requirements.join(",")
//           : ""
//       );

//       formData.append(
//         "rewards",
//         Array.isArray(prizes)
//           ? prizes.join(",")
//           : ""
//       );

//       if (banner && banner instanceof File && banner.size > 0) {
//         formData.append("image", banner);
//       }

//       // 🔥 DEBUG SAME
//       console.log("===== FINAL FORM DATA =====");
//       for (let [key, value] of formData.entries()) {
//         console.log(key, ":", value);
//       }
//       console.log("===== END =====");

//       // ✅ ONLY THIS LINE FIXED
//       const res = await dispatch(createContest(formData)).unwrap();

//       console.log("✅ RESPONSE:", res);

//       toast.success("🎉 Contest Created Successfully");

//       // 🔥 SAME RESET
//       setForm({
//         title: "",
//         description: "",
//         startDate: "",
//         deadline: "",
//       });
//       setRequirements([]);
//       setPrizes([]);
//       setBanner(null);

//     } catch (err) {
//       console.log("❌ ERROR:", err);

//       toast.error(
//         err?.message ||
//         err?.response?.data?.message ||
//         "❌ Create failed"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] p-6">

//       {/* 🔥 HEADER */}
//       <div className="mb-8">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//           🎯 Create New Contest
//         </h1>

//         <p className="text-gray-500 mt-1 text-sm md:text-base">
//           Build engaging contests with rewards, timelines, and guidelines.
//         </p>
//       </div>

//       {/* 🔥 MAIN GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//         <ContestFormSection
//           form={form}
//           setForm={setForm}
//           requirements={requirements}
//           setRequirements={setRequirements}
//           setBanner={setBanner}
//         />

//         <ContestSidebar
//           form={form}
//           setForm={setForm}
//           prizes={prizes}
//           setPrizes={setPrizes}
//         />

//       </div>

//       {/* 🔥 ACTION BAR */}
//       <div className="mt-8 flex justify-end">
//         <div className="bg-white shadow-md rounded-xl px-5 py-3 border flex items-center gap-4">

//           <p className="text-sm text-gray-400 hidden sm:block">
//             Ready to publish your contest?
//           </p>

//           <Button
//             onClick={handleCreate}
//             variant="primary"
//             className="px-6 py-2 text-sm font-medium"
//           >
//             🚀 Create Contest
//           </Button>

//         </div>
//       </div>

//     </div>
//   );
// };

// export default CreateContestView;

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import ContestFormSection from "../componnent/ContestFormSection";
import ContestSidebar from "../componnent/ContestSidebar";

import {
  createContest,
  fetchContests,
} from "../../../features/contestSlice";

import Button from "../../../components/ui/Button";
import { Rocket } from "lucide-react";

const CreateContestView = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    deadline: "",
    participationType: "solo",
    maxTeamSize: "",
  });

  const [requirements, setRequirements] = useState([]);
  const [prizes, setPrizes] = useState([]);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    dispatch(fetchContests());
  }, [dispatch]);

  const handleCreate = async () => {
    try {
      if (
        !form.title ||
        !form.description ||
        !form.startDate ||
        !form.deadline
      ) {
        toast.error("All fields are required");
        return;
      }

      if (
        form.participationType === "team" &&
        Number(form.maxTeamSize) < 2
      ) {
        toast.error("Team size must be at least 2");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      // ✅ BASIC
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("startDate", form.startDate);
      formData.append("deadline", form.deadline);

      // ✅ REWARDS (UPDATED 🔥)
      const cleanRewards = prizes
        .map((p) => p.trim())
        .filter((p) => p !== "");

      formData.append("rewards", cleanRewards.join(","));

      // ✅ REQUIREMENTS
      const cleanRequirements = requirements
        .map((r) => r.trim())
        .filter((r) => r !== "");

      formData.append("requirements", cleanRequirements.join(","));

      // ✅ PARTICIPATION
      formData.append("participationType", form.participationType);

      if (form.participationType === "team") {
        formData.append("maxTeamSize", form.maxTeamSize);
      }

      // ✅ IMAGE
      if (banner && banner instanceof File) {
        formData.append("image", banner);
      }

      // 🔍 DEBUG
      console.log("===== FORM DATA =====");
      for (let [key, value] of formData.entries()) {
        console.log(key, ":", value);
      }

      await dispatch(createContest(formData)).unwrap();

      toast.success("🎉 Contest Created Successfully");

      // 🔄 RESET
      setForm({
        title: "",
        description: "",
        startDate: "",
        deadline: "",
        participationType: "solo",
        maxTeamSize: "",
      });

      setRequirements([]);
      setPrizes([]);
      setBanner(null);

    } catch (err) {
      console.log(err);
      toast.error("❌ Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          🎯 Create Contest
        </h1>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <ContestFormSection
          form={form}
          setForm={setForm}
          requirements={requirements}
          setRequirements={setRequirements}
          setBanner={setBanner}
        />

        <ContestSidebar
          form={form}
          setForm={setForm}
          prizes={prizes}
          setPrizes={setPrizes}
        />
            
      </div>

      {/* 🔥 STICKY BUTTON */}
      <div className="mt-10 flex justify-center">
        <div className="w-full max-w-xl bg-white border border-gray-100 rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* TEXT */}
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-gray-800">
              Ready to publish your contest?
            </p>
            <p className="text-xs text-gray-400">
              Make sure everything looks perfect before launch 🚀
            </p>
          </div>

          {/* 🔥 ULTRA BUTTON */}
          <button
            onClick={handleCreate}
            disabled={loading}
            className={`relative overflow-hidden group w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300
      ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#82C600] to-[#6ea800] hover:shadow-lg hover:shadow-[#82C600]/30 active:scale-95"
              }`}
          >

            {/* Glow Effect */}
            {!loading && (
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/10 blur-xl" />
            )}

            {/* Content */}
            <span className="relative flex items-center justify-center gap-2">

              {/* ICON */}
              <Rocket
                size={16}
                className={`transition-transform duration-300 ${!loading && "group-hover:translate-x-1 group-hover:-translate-y-1"
                  }`}
              />

              {/* TEXT */}
              {loading ? "Creating..." : "Publish Contest"}

            </span>
          </button>

        </div>
      </div>

    </div>
  );
};

export default CreateContestView;