// import { Upload, Plus } from "lucide-react";
// import Input from "../../../components/ui/Input";
// import Button from "../../../components/ui/Button";

// const ContestFormSection = ({
//   form,
//   setForm,
//   requirements,
//   setRequirements,
//   setBanner,
// }) => {

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleBanner = (e) => {
//     const file = e.target.files[0];
//     if (file) setBanner(file);
//   };

//   return (
//     <div className="lg:col-span-2 space-y-5 sm:space-y-6">

//       {/* 🔥 BASIC INFO */}
//       <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">

//         <div className="flex justify-between items-center mb-5">
//           <h2 className="font-semibold text-gray-800 text-lg">
//             Basic Information
//           </h2>

//           <span className="text-xs bg-[#82C600]/10 text-[#82C600] px-2 py-1 rounded-full">
//             Step 1
//           </span>
//         </div>

//         <div className="space-y-4">
//           <Input
//             label="Contest Title"
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//           />

//           <Input
//             label="Description"
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       {/* 🔥 BANNER */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//         {/* Upload Card */}
//         <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-gray-200 text-center relative hover:border-[#82C600] hover:bg-[#82C600]/5 transition">

//           <input
//             type="file"
//             className="absolute inset-0 opacity-0 cursor-pointer"
//             onChange={handleBanner}
//           />

//           <div className="flex flex-col items-center gap-2">
//             <div className="p-3 rounded-full bg-[#82C600]/10 text-[#82C600]">
//               <Upload size={20} />
//             </div>

//             <p className="text-sm font-medium text-gray-700">
//               Upload Contest Banner
//             </p>

//             <p className="text-xs text-gray-400">
//               Click or drag to upload
//             </p>
//           </div>
//         </div>

//         {/* Info Card */}
//         <div className="bg-gradient-to-br from-[#82C600] to-green-500 text-white p-6 rounded-3xl shadow-md">
//           <h3 className="font-semibold mb-2 text-lg">
//             Visual Strategy 🎯
//           </h3>

//           <p className="text-sm opacity-90 leading-relaxed">
//             High-quality banners increase engagement by 45%.
//           </p>
//         </div>

//       </div>

//       {/* 🔥 REQUIREMENTS */}
//       <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">

//         <div className="flex justify-between items-center mb-5">
//           <h2 className="font-semibold text-gray-800 text-lg">
//             Participation Guidelines
//           </h2>

//           <span className="text-xs text-gray-400">Optional</span>
//         </div>

//         <div className="space-y-3">

//           {requirements.map((req, i) => (
//             <div
//               key={i}
//               className="flex items-center gap-2 bg-gray-50 border rounded-xl px-3 py-2"
//             >
//               <Input
//                 value={req}
//                 onChange={(e) => {
//                   const copy = [...requirements];
//                   copy[i] = e.target.value;
//                   setRequirements(copy);
//                 }}
//               />

//               <button
//                 onClick={() =>
//                   setRequirements(requirements.filter((_, idx) => idx !== i))
//                 }
//                 className="text-red-400 hover:text-red-600 text-sm font-bold"
//               >
//                 ✕
//               </button>
//             </div>
//           ))}

//         </div>

//         {/* ✅ Using YOUR Button */}
//         <div className="mt-4">
//           <Button
//             variant="outline"
//             className="flex items-center gap-2 border-dashed border-2 hover:bg-[#82C600]/5"
//             onClick={() => setRequirements([...requirements, ""])}
//           >
//             <Plus size={14} />
//             Add Requirement
//           </Button>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default ContestFormSection;

import { Upload, Plus, Users, User } from "lucide-react";
import { useEffect } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const ContestFormSection = ({
  form,
  setForm,
  requirements,
  setRequirements,
  setBanner,
}) => {

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 IMAGE HANDLER WITH PREVIEW
  const handleBanner = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner(file);

      const preview = URL.createObjectURL(file);

      setForm((prev) => ({
        ...prev,
        bannerPreview: preview,
      }));
    }
  };

  // 🔥 CLEANUP (PRO LEVEL)
  useEffect(() => {
    return () => {
      if (form.bannerPreview) {
        URL.revokeObjectURL(form.bannerPreview);
      }
    };
  }, [form.bannerPreview]);

  const teamSizes = [2, 3, 4, 5];

  return (
    <div className="lg:col-span-2 space-y-6">

      {/* 🔥 BASIC INFO */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-semibold text-gray-800 text-lg">
            Basic Information
          </h2>
          <span className="text-xs bg-[#82C600]/10 text-[#82C600] px-2 py-1 rounded-full">
            Step 1
          </span>
        </div>

        <div className="space-y-4">
          <Input
            label="Contest Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          <Input
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* 🔥 PARTICIPATION TYPE */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-semibold text-gray-800 text-lg">
            Participation Type
          </h2>
          <span className="text-xs bg-[#82C600]/10 text-[#82C600] px-2 py-1 rounded-full">
            Step 2
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">

          {/* SOLO */}
          <div
            onClick={() =>
              setForm({ ...form, participationType: "solo", maxTeamSize: "" })
            }
            className={`cursor-pointer rounded-2xl p-4 border transition ${
              form.participationType === "solo"
                ? "border-[#82C600] bg-[#82C600]/5 shadow-sm"
                : "border-gray-200 hover:border-[#82C600]/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#82C600]/10 text-[#82C600]">
                <User size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Solo</p>
                <p className="text-xs text-gray-400">Individual participation</p>
              </div>
            </div>
          </div>

          {/* TEAM */}
          <div
            onClick={() =>
              setForm({ ...form, participationType: "team" })
            }
            className={`cursor-pointer rounded-2xl p-4 border transition ${
              form.participationType === "team"
                ? "border-[#82C600] bg-[#82C600]/5 shadow-sm"
                : "border-gray-200 hover:border-[#82C600]/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                <Users size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Team</p>
                <p className="text-xs text-gray-400">Group participation</p>
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 TEAM SIZE */}
        {form.participationType === "team" && (
          <div className="mt-5 p-4 rounded-2xl border bg-gradient-to-r from-blue-50 to-indigo-50">

            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Select Team Size
            </h4>

            <div className="flex gap-2 flex-wrap mb-3">
              {teamSizes.map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setForm({ ...form, maxTeamSize: size })
                  }
                  className={`px-3 py-1 rounded-full text-sm border transition ${
                    Number(form.maxTeamSize) === size
                      ? "bg-[#82C600] text-white border-[#82C600]"
                      : "bg-white hover:border-[#82C600]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <input
              type="number"
              min="2"
              placeholder="Custom team size"
              value={form.maxTeamSize}
              onChange={(e) =>
                setForm({ ...form, maxTeamSize: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#82C600]"
            />
          </div>
        )}
      </div>

      {/* 🔥 BANNER WITH PREVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-gray-200 text-center relative hover:border-[#82C600] hover:bg-[#82C600]/5 transition overflow-hidden">

          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            onChange={handleBanner}
          />

          {form.bannerPreview ? (
            <div className="relative group">

              <img
                src={form.bannerPreview}
                alt="banner preview"
                className="w-full h-40 object-cover rounded-xl"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-xl">
                <p className="text-white text-sm font-medium">
                  Change Image
                </p>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-[#82C600]/10 text-[#82C600]">
                <Upload size={20} />
              </div>

              <p className="text-sm font-medium text-gray-700">
                Upload Contest Banner
              </p>

              <p className="text-xs text-gray-400">
                Click or drag to upload
              </p>
            </div>
          )}

        </div>

        <div className="bg-gradient-to-br from-[#82C600] to-green-500 text-white p-6 rounded-3xl shadow-md">
          <h3 className="font-semibold mb-2 text-lg">
            Visual Strategy 🎯
          </h3>
          <p className="text-sm opacity-90">
            High-quality banners increase engagement by 45%.
          </p>
        </div>

      </div>

      {/* 🔥 REQUIREMENTS */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">

        <div className="flex justify-between items-center mb-5">
          <h2 className="font-semibold text-gray-800 text-lg">
            Participation Guidelines
          </h2>

          <span className="text-xs text-gray-400">Optional</span>
        </div>

        <div className="space-y-3">

          {requirements.map((req, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-gray-50 border rounded-xl px-3 py-2"
            >
              <Input
                value={req}
                onChange={(e) => {
                  const copy = [...requirements];
                  copy[i] = e.target.value;
                  setRequirements(copy);
                }}
              />

              <button
                onClick={() =>
                  setRequirements(requirements.filter((_, idx) => idx !== i))
                }
                className="text-red-400 hover:text-red-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>
          ))}

        </div>

        <div className="mt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-dashed border-2 hover:bg-[#82C600]/5"
            onClick={() => setRequirements([...requirements, ""])}
          >
            <Plus size={14} />
            Add Requirement
          </Button>
        </div>

      </div>

    </div>
  );
};

export default ContestFormSection;