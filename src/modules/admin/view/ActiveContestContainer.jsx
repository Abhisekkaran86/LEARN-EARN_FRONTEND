// import { useState, useEffect, useMemo } from "react";
// import ActiveContestUI from "./ActiveContestUI";
// import {
//   getContestsApi,
//   updateContestApi,
//   deleteContestApi,
// } from "../api/contest.api";
// import { toast } from "react-toastify";

// const ITEMS_PER_PAGE = 3;

// const ActiveContestContainer = () => {

//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [page, setPage] = useState(1);

//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   // ✅ FETCH DATA
//   const fetchContests = async () => {
//     try {
//       setLoading(true);
//       const res = await getContestsApi();
//       setTableData(res.data.data || []);
//     } catch (err) {
//       toast.error("❌ Failed to fetch contests");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchContests();
//   }, []);

//   // ✅ DELETE (API)
//   const handleDelete = async (id) => {
//     try {
//       await deleteContestApi(id);

//       setTableData((prev) => prev.filter((item) => item.id !== id));

//       toast.success("🗑️ Contest deleted");
//     } catch (err) {
//       toast.error("❌ Delete failed");
//     }
//   };

//   // ✅ EDIT OPEN
//   const handleEdit = (item) => {
//     setSelectedItem({ ...item });
//     setIsEditOpen(true);
//   };

//   // ✅ SAVE (API)
//   const handleSave = async () => {
//     try {
//       await updateContestApi(selectedItem.id, selectedItem);

//       setTableData((prev) =>
//         prev.map((item) =>
//           item.id === selectedItem.id
//             ? { ...item, ...selectedItem }
//             : item
//         )
//       );

//       setIsEditOpen(false);

//       toast.success("✅ Contest updated");
//     } catch (err) {
//       toast.error("❌ Update failed");
//     }
//   };

//   // 🔍 FILTER
//   const filteredData = useMemo(() => {
//     let result = [...tableData];

//     if (search) {
//       result = result.filter((item) =>
//         item.title.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (filter !== "all") {
//       result = result.filter((item) => item.status === filter);
//     }

//     return result;
//   }, [tableData, search, filter]);

//   const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

//   const paginatedData = filteredData.slice(
//     (page - 1) * ITEMS_PER_PAGE,
//     page * ITEMS_PER_PAGE
//   );

//   return (
//     <ActiveContestUI
//       data={paginatedData}
//       loading={loading}

//       search={search}
//       setSearch={setSearch}
//       filter={filter}
//       setFilter={setFilter}

//       page={page}
//       setPage={setPage}
//       totalPages={totalPages}

//       onEdit={handleEdit}
//       onDelete={handleDelete}

//       isEditOpen={isEditOpen}
//       setIsEditOpen={setIsEditOpen}
//       selectedItem={selectedItem}
//       setSelectedItem={setSelectedItem}
//       onSave={handleSave}
//     />
//   );
// };

// export default ActiveContestContainer;


import { useState, useEffect, useMemo } from "react";
import ActiveContestUI from "./ActiveContestUI";
import {
  getContestsApi,
  updateContestApi,
  deleteContestApi,
} from "../api/contest.api";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 10; // ✅ FIX: increase or control

const ActiveContestContainer = () => {

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // ✅ FETCH DATA
  const fetchContests = async () => {
    try {
      setLoading(true);
      const res = await getContestsApi();

      // 🔥 FIX: normalize id
      const formatted = (res.data.data || []).map((item) => ({
        ...item,
        id: item._id || item.id, // unify id
      }));

      setTableData(formatted);

    } catch (err) {
      toast.error("❌ Failed to fetch contests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  // ✅ RESET PAGE WHEN SEARCH/FILTER
  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  // ✅ DELETE (API)
  const handleDelete = async (id) => {
    try {
      await deleteContestApi(id);

      setTableData((prev) =>
        prev.filter((item) => item.id !== id)
      );

      toast.success("🗑️ Contest deleted");
    } catch (err) {
      toast.error("❌ Delete failed");
    }
  };

  // ✅ EDIT OPEN
  const handleEdit = (item) => {
    setSelectedItem({ ...item }); // clone
    setIsEditOpen(true);
  };

  // ✅ SAVE (API)
  const handleSave = async () => {
    try {
      await updateContestApi(selectedItem.id, selectedItem);

      setTableData((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id
            ? { ...item, ...selectedItem }
            : item
        )
      );

      setIsEditOpen(false);

      toast.success("✅ Contest updated");
    } catch (err) {
      toast.error("❌ Update failed");
    }
  };

  // 🔍 FILTER
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

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
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
  );
};

export default ActiveContestContainer;