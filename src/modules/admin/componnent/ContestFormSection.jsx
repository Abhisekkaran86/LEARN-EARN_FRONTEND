import { Upload, Plus } from "lucide-react";
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

  const handleBanner = (e) => {
    const file = e.target.files[0];
    if (file) setBanner(file);
  };

  return (
    <div className="lg:col-span-2 space-y-5 sm:space-y-6">

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

      {/* 🔥 BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Upload Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-gray-200 text-center relative hover:border-[#82C600] hover:bg-[#82C600]/5 transition">

          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleBanner}
          />

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
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-[#82C600] to-green-500 text-white p-6 rounded-3xl shadow-md">
          <h3 className="font-semibold mb-2 text-lg">
            Visual Strategy 🎯
          </h3>

          <p className="text-sm opacity-90 leading-relaxed">
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

        {/* ✅ Using YOUR Button */}
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