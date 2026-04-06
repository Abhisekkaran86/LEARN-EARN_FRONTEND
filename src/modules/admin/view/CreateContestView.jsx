
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

const CreateContestView = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    deadline: "",
  });

  const [requirements, setRequirements] = useState([]);
  const [prizes, setPrizes] = useState([]);
  const [banner, setBanner] = useState(null);

  // 🔥 SAME FUNCTIONALITY (unchanged)
  useEffect(() => {
    dispatch(fetchContests());
  }, [dispatch]);

  // 🔥 SAME FUNCTIONALITY (only Redux call fixed)
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

      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("startDate", form.startDate);
      formData.append("deadline", form.deadline);

      formData.append(
        "requirements",
        Array.isArray(requirements)
          ? requirements.join(",")
          : ""
      );

      formData.append(
        "rewards",
        Array.isArray(prizes)
          ? prizes.join(",")
          : ""
      );

      if (banner && banner instanceof File && banner.size > 0) {
        formData.append("image", banner);
      }

      // 🔥 DEBUG SAME
      console.log("===== FINAL FORM DATA =====");
      for (let [key, value] of formData.entries()) {
        console.log(key, ":", value);
      }
      console.log("===== END =====");

      // ✅ ONLY THIS LINE FIXED
      const res = await dispatch(createContest(formData)).unwrap();

      console.log("✅ RESPONSE:", res);

      toast.success("🎉 Contest Created Successfully");

      // 🔥 SAME RESET
      setForm({
        title: "",
        description: "",
        startDate: "",
        deadline: "",
      });
      setRequirements([]);
      setPrizes([]);
      setBanner(null);

    } catch (err) {
      console.log("❌ ERROR:", err);

      toast.error(
        err?.message ||
        err?.response?.data?.message ||
        "❌ Create failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] p-6">

      {/* 🔥 HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          🎯 Create New Contest
        </h1>

        <p className="text-gray-500 mt-1 text-sm md:text-base">
          Build engaging contests with rewards, timelines, and guidelines.
        </p>
      </div>

      {/* 🔥 MAIN GRID */}
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

      {/* 🔥 ACTION BAR */}
      <div className="mt-8 flex justify-end">
        <div className="bg-white shadow-md rounded-xl px-5 py-3 border flex items-center gap-4">

          <p className="text-sm text-gray-400 hidden sm:block">
            Ready to publish your contest?
          </p>

          <Button
            onClick={handleCreate}
            variant="primary"
            className="px-6 py-2 text-sm font-medium"
          >
            🚀 Create Contest
          </Button>

        </div>
      </div>

    </div>
  );
};

export default CreateContestView;