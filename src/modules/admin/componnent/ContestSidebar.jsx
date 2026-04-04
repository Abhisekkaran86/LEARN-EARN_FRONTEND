import { Calendar, Trophy } from "lucide-react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const ContestSidebar = ({ form, setForm, prizes, setPrizes }) => {

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">

      {/* 🔥 TIMELINE */}
      <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-[#82C600]/10 text-[#82C600]">
            <Calendar size={18} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              Timeline
            </h3>
            <p className="text-xs text-gray-400">
              Set contest duration
            </p>
          </div>
        </div>

        <div className="space-y-4">

          <div className="bg-gray-50 p-3 rounded-xl border">
            <label className="text-xs text-gray-500 mb-1 block">
              Start Date
            </label>
            <Input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-xl border">
            <label className="text-xs text-gray-500 mb-1 block">
              Deadline
            </label>
            <Input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
            />
          </div>

        </div>
      </div>

      {/* 🔥 PRIZES */}
      <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-yellow-100 text-yellow-600">
            <Trophy size={18} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              Rewards & Prizes
            </h3>
            <p className="text-xs text-gray-400">
              Motivate participants 🎯
            </p>
          </div>
        </div>

        <div className="space-y-3">

          {prizes.map((p, i) => (
            <div
              key={i}
              className={`group flex justify-between items-center px-4 py-3 rounded-xl border transition ${
                i === 0
                  ? "bg-gradient-to-r from-[#82C600]/10 to-green-50 border-[#82C600]/20"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >

              {/* LEFT */}
              <div className="flex items-center gap-3">

                {/* Medal Icon */}
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold ${
                  i === 0
                    ? "bg-[#82C600] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {i + 1}
                </div>

                <span className="text-sm font-medium text-gray-700">
                  {p}
                </span>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 text-xs opacity-0 group-hover:opacity-100 transition">

                <button
                  onClick={() => {
                    const val = prompt("Edit prize", p);
                    if (val) {
                      const copy = [...prizes];
                      copy[i] = val;
                      setPrizes(copy);
                    }
                  }}
                  className="px-2 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    setPrizes(prizes.filter((_, idx) => idx !== i))
                  }
                  className="px-2 py-1 rounded bg-red-50 text-red-500 hover:bg-red-100"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* ADD BUTTON */}
        <div className="mt-5">
          <Button
            variant="outline"
            className="w-full border-dashed border-2 hover:bg-[#82C600]/5 transition"
            onClick={() => {
              const val = prompt("Enter prize");
              if (val) setPrizes([...prizes, val]);
            }}
          >
            + Add Prize Level
          </Button>
        </div>

      </div>

      {/* 🔥 TIP */}
      <div className="bg-gradient-to-r from-[#82C600]/10 via-green-50 to-[#82C600]/10 border border-[#82C600]/20 p-4 rounded-2xl text-sm text-[#82C600] shadow-sm">
        🎯 Contests with multiple prize categories attract more participants.
      </div>

    </div>
  );
};

export default ContestSidebar;