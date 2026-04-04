

// import { Upload, Calendar, Trophy, Plus } from "lucide-react";
// import { useState } from "react";
// import Button from "../../../components/ui/Button";
// import Input from "../../../components/ui/Input";

// const CreateContestView = () => {

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     rules: "",
//     startDate: "",
//     deadline: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [requirements, setRequirements] = useState([""]);

//   const [banner, setBanner] = useState(null);

//   const [prizes, setPrizes] = useState([
//     "1st Place - ₹5000 + Medal",
//     "Certificate - Merit",
//   ]);

//   // ✅ HANDLE INPUT
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ✅ BANNER
//   const handleBannerUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setBanner(file);
//     console.log("📸 Banner:", file);
//   };

//   // ✅ VALIDATION
//   const validate = () => {
//     let newErrors = {};

//     if (!form.title) newErrors.title = "Title is required";
//     if (!form.description) newErrors.description = "Description required";
//     if (!form.startDate) newErrors.startDate = "Start date required";
//     if (!form.deadline) newErrors.deadline = "Deadline required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ✅ REQUIREMENTS
//   const addRequirement = () => {
//     setRequirements([...requirements, ""]);
//   };

//   const updateRequirement = (value, index) => {
//     const updated = [...requirements];
//     updated[index] = value;
//     setRequirements(updated);
//   };

//   const deleteRequirement = (index) => {
//     const updated = requirements.filter((_, i) => i !== index);
//     setRequirements(updated);
//   };

//   // ✅ PRIZES
//   const addPrize = () => {
//     const newPrize = prompt("Enter new prize");
//     if (newPrize) {
//       setPrizes([...prizes, newPrize]);
//     }
//   };

//   const editPrize = (index) => {
//     const updatedValue = prompt("Edit Prize", prizes[index]);
//     if (updatedValue) {
//       const updated = [...prizes];
//       updated[index] = updatedValue;
//       setPrizes(updated);
//     }
//   };

//   const deletePrize = (index) => {
//     const updated = prizes.filter((_, i) => i !== index);
//     setPrizes(updated);
//   };

//   // ✅ SUBMIT
//   const handlePublish = () => {
//     if (!validate()) return;

//     const finalData = {
//       ...form,
//       requirements,
//       prizes,
//       banner,
//       createdAt: new Date().toISOString(),
//     };

//     console.log("🚀 ========================");
//     console.log("🚀 FINAL DATA");
//     console.log(finalData);
//     console.table(finalData);
//     console.log("🚀 ========================");

//     alert("Contest Published Successfully!");
//   };

//   const handleSaveDraft = () => {
//     const draft = {
//       ...form,
//       requirements,
//       prizes,
//       banner,
//       status: "draft",
//     };

//     console.log("💾 ========================");
//     console.log("💾 DRAFT DATA");
//     console.log(draft);
//     console.table(draft);
//     console.log("💾 ========================");

//     alert("Draft Saved!");
//   };

//   return (
//     <div className="bg-[#f5f7fb] min-h-screen px-6 py-4">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             Architecting a New Challenge
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Design a contest that inspires excellence.
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <Button variant="outline" full={false} onClick={handleSaveDraft}>
//             Save Draft
//           </Button>

//           <Button full={false} onClick={handlePublish}>
//             Publish Contest
//           </Button>
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

//         {/* LEFT */}
//         <div className="xl:col-span-2 space-y-6">

//           {/* BASIC INFO */}
//           <div className="bg-white rounded-2xl p-5 shadow-sm">
//             <div className="flex justify-between mb-4">
//               <h2 className="font-semibold text-gray-800">Basic Info</h2>
//               <span className="text-xs bg-[#82C600]/20 text-[#82C600] px-2 py-1 rounded">
//                 Step 1
//               </span>
//             </div>

//             <Input
//               label="Contest Title"
//               name="title"
//               value={form.title}
//               onChange={handleChange}
//               error={errors.title}
//             />

//             <div className="mt-4">
//               <Input
//                 label="Description"
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 error={errors.description}
//               />
//             </div>
//           </div>

//           {/* BANNER */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-white p-5 rounded-2xl border-dashed border-2 text-center cursor-pointer relative">

//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleBannerUpload}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//               />

//               <Upload className="mx-auto text-gray-400 mb-2" />
//               <p className="text-sm text-gray-500">
//                 Upload banner (future feature)
//               </p>
//             </div>

//             <div className="bg-[#82C600] text-white p-5 rounded-2xl">
//               <h3 className="font-semibold mb-2">Visual Strategy</h3>
//               <p className="text-sm opacity-90">
//                 High-quality banners increase engagement by 45%.
//               </p>
//             </div>
//           </div>

//           {/* REQUIREMENTS */}
//           <div className="bg-white p-5 rounded-2xl shadow-sm">
//             <h2 className="font-semibold mb-4">
//               Participation Guidelines
//             </h2>

//             {requirements.map((req, index) => (
//               <div key={index} className="mb-2 flex gap-2 items-center">
                
//                 <Input
//                   value={req}
//                   onChange={(e) =>
//                     updateRequirement(e.target.value, index)
//                   }
//                 />

//                 <button
//                   onClick={() => deleteRequirement(index)}
//                   className="text-red-500 text-xs"
//                 >
//                   ✕
//                 </button>

//               </div>
//             ))}

//             <button
//               onClick={addRequirement}
//               className="text-sm text-[#82C600] flex items-center gap-1 mt-2"
//             >
//               <Plus size={14} /> Add another requirement
//             </button>
//           </div>

//         </div>

//         {/* RIGHT */}
//         <div className="space-y-6">

//           {/* TIMELINE */}
//           <div className="bg-white p-5 rounded-2xl shadow-sm">
//             <h3 className="font-semibold mb-4 flex items-center gap-2">
//               <Calendar size={16} /> Timeline
//             </h3>

//             <Input
//               type="date"
//               name="startDate"
//               value={form.startDate}
//               onChange={handleChange}
//               error={errors.startDate}
//             />

//             <div className="mt-3">
//               <Input
//                 type="date"
//                 name="deadline"
//                 value={form.deadline}
//                 onChange={handleChange}
//                 error={errors.deadline}
//               />
//             </div>
//           </div>

//           {/* PRIZES */}
//           <div className="bg-white p-5 rounded-2xl shadow-sm">
//             <h3 className="font-semibold mb-4 flex items-center gap-2">
//               <Trophy size={16} /> Rewards
//             </h3>

//             {prizes.map((p, i) => (
//               <div
//                 key={i}
//                 className={`p-3 rounded-lg mb-3 flex justify-between items-center ${
//                   i === 0
//                     ? "bg-[#82C600]/10 text-[#82C600]"
//                     : "bg-gray-100"
//                 }`}
//               >
//                 <span>{p}</span>

//                 <div className="flex gap-2 text-xs">
//                   <button
//                     onClick={() => editPrize(i)}
//                     className="text-blue-500"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => deletePrize(i)}
//                     className="text-red-500"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}

//             <Button variant="outline" onClick={addPrize}>
//               + Add Prize Level
//             </Button>
//           </div>

//           {/* TIP */}
//           <div className="bg-[#82C600]/10 text-[#82C600] p-4 rounded-xl text-sm">
//             Contests with multiple prize categories attract more participants.
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateContestView;
import { useState } from "react";
import ContestFormSection from "../componnent/ContestFormSection";
import ContestSidebar from "../componnent/ContestSidebar";
import Button from "../../../components/ui/Button";
import { toast } from "react-toastify";

const CreateContestView = () => {

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    deadline: "",
  });

  const [requirements, setRequirements] = useState([""]);
  const [prizes, setPrizes] = useState([
    "1st Place - ₹5000 + Medal",
    "Certificate - Merit",
  ]);
  const [banner, setBanner] = useState(null);

  // ✅ VALIDATION
  const validate = () => {
    if (!form.title || !form.description) {
      toast.error("❌ Please fill all required fields");
      return false;
    }
    return true;
  };

  // ✅ PUBLISH
  const handlePublish = async () => {
    if (!validate()) return;

    try {
      // 👉 API call (replace with your backend)
      console.log({ form, requirements, prizes, banner });

      toast.success(`🎉 ${form.title} created successfully!`);

      // reset form (optional)
      setForm({
        title: "",
        description: "",
        startDate: "",
        deadline: "",
      });
      setRequirements([""]);
      setPrizes([]);

    } catch (err) {
      toast.error("❌ Failed to create contest");
    }
  };

  // ✅ DRAFT
  const handleDraft = () => {
    toast.info("💾 Draft saved successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] px-3 sm:px-6 py-6">

      {/* 🔥 HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create New Contest
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Design and launch engaging contests 🚀
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white border rounded-xl p-2 shadow-sm">

          <Button
            variant="outline"
            onClick={handleDraft}
          >
            Save Draft
          </Button>

          <Button
            className="bg-[#82C600] hover:bg-[#6ea800]"
            onClick={handlePublish}
          >
            🚀 Publish
          </Button>

        </div>
      </div>

      {/* 🔥 MAIN */}
      <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg p-4 sm:p-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

          <div className="lg:col-span-2">
            <ContestFormSection
              form={form}
              setForm={setForm}
              requirements={requirements}
              setRequirements={setRequirements}
              setBanner={setBanner}
            />
          </div>

          <div>
            <ContestSidebar
              form={form}
              setForm={setForm}
              prizes={prizes}
              setPrizes={setPrizes}
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default CreateContestView;