
import { useState, useEffect, useMemo } from "react";
import ActiveContestUI from "@/features/admin/components/ActiveContestUI";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchContests,
  updateContest,
  deleteContest,
} from "@/features/contest/contestSlice";

const ITEMS_PER_PAGE = 10;

const ActiveContestContainer = () => {
  const dispatch = useDispatch();
  const { contests, loading } = useSelector((state) => state.contest);

  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // ✅ FETCH DATA
  useEffect(() => {
    dispatch(fetchContests());
  }, [dispatch]);

  // ✅ MAP DATA
  useEffect(() => {
    if (contests && contests.length) {
      const formatted = contests.map((item) => ({
        id: item._id,
        _id: item._id,
        title: item.title || "No Title",
        startDate: item.startDate || "",
        deadline: item.deadline || "",
        participants: Array.isArray(item.users)
          ? item.users.length
          : 0,
        status: item.status || "upcoming",
      }));

      setTableData(formatted);
    }
  }, [contests]);

  // ✅ RESET PAGE (important for UX)
  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteContest(id)).unwrap();
      toast.success("🗑️ Contest deleted");
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Delete failed ❌");
    }
  };

  // ✅ EDIT
  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditOpen(true);
  };

  // ✅ UPDATE
  const handleSave = async () => {
    try {
      if (!selectedItem?.id) {
        toast.error("Invalid ID ❌");
        return;
      }

      const cleanData = {
        title: selectedItem.title,
        startDate: selectedItem.startDate,
        deadline: selectedItem.deadline,
        status: selectedItem.status,
      };

      await dispatch(
        updateContest({
          id: selectedItem.id,
          data: cleanData,
        })
      ).unwrap();

      toast.success("✏️ Contest updated");
      dispatch(fetchContests());

      setIsEditOpen(false);
      setSelectedItem(null);
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Update failed ❌");
    }
  };

  // 🔍 FILTER (optimized)
  const filteredData = useMemo(() => {
    let result = [...tableData];

    if (search) {
      result = result.filter((item) =>
        item.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter !== "all") {
      result = result.filter((item) => item.status === filter);
    }

    return result;
  }, [tableData, search, filter]);

  // ✅ PAGINATION
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );
  }, [filteredData, page]);

  return (
    <div className="w-full overflow-hidden">

      {/* ✅ Important wrapper for mobile scroll */}
      <div className="w-full overflow-x-auto">
        <ActiveContestUI
          data={paginatedData}
          loading={loading}
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          onSave={handleSave}
        />
      </div>

    </div>
  );
};

export default ActiveContestContainer;

