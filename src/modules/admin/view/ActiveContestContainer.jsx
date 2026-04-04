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


// import { useState, useEffect, useMemo } from "react";
// import ActiveContestUI from "./ActiveContestUI";
// import {
//   updateContestApi,
//   deleteContestApi,
// } from "../api/contest.api";
// import { toast } from "react-toastify";

// // ✅ Redux
// import { useDispatch, useSelector } from "react-redux";
// import { fetchContests } from "../features/contestSlice";

// const ITEMS_PER_PAGE = 10;

// const ActiveContestContainer = () => {
//   const dispatch = useDispatch();

//   // ✅ Redux state
//   const { contests } = useSelector((state) => state.contest);

//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [page, setPage] = useState(1);

//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   // ✅ FETCH DATA FROM REDUX
//   const fetchContestsData = async () => {
//     try {
//       setLoading(true);
//       await dispatch(fetchContests());
//     } catch (err) {
//       toast.error("❌ Failed to fetch contests");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchContestsData();
//   }, []);

//   // ✅ Sync Redux → Local State (IMPORTANT)
//   useEffect(() => {
//     if (contests && contests.length) {
//       const formatted = contests.map((item) => ({
//         ...item,
//         id: item._id || item.id, // unify id
//       }));

//       setTableData(formatted);
//     }
//   }, [contests]);

//   // ✅ RESET PAGE WHEN SEARCH/FILTER
//   useEffect(() => {
//     setPage(1);
//   }, [search, filter]);

//   // ✅ DELETE (API)
//   const handleDelete = async (id) => {
//     try {
//       await deleteContestApi(id);

//       setTableData((prev) =>
//         prev.filter((item) => item.id !== id)
//       );

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
//         item.title?.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (filter !== "all") {
//       result = result.filter((item) => item.status === filter);
//     }

//     return result;
//   }, [tableData, search, filter]);

//   // ✅ PAGINATION
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



// import { useState, useEffect, useMemo } from "react";
// import ActiveContestUI from "./ActiveContestUI";

// import { toast } from "react-toastify";

// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchContests,
//   updateContest,
//   deleteContest,
// } from "../../../features/contestSlice";



// const ITEMS_PER_PAGE = 10;

// const ActiveContestContainer = () => {
//   const dispatch = useDispatch();
//   const { contests } = useSelector((state) => state.contest);

//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [page, setPage] = useState(1);

//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   // 🔥 AUTO STATUS FUNCTION (NEW)
//   const getStatusFromDate = (date) => {
//     if (!date) return "upcoming";

//     const today = new Date();
//     const contestDate = new Date(date);

//     today.setHours(0, 0, 0, 0);
//     contestDate.setHours(0, 0, 0, 0);

//     if (contestDate > today) return "upcoming";
//     if (contestDate.getTime() === today.getTime()) return "active";
//     return "complete";
//   };

//   // ✅ FETCH DATA (REDUX)
//   useEffect(() => {
//     dispatch(fetchContests(),
//     updateContest(),
//   deleteContest(),
    
//   );
//   }, [dispatch]);

//   // ✅ MAP DATA (FIXED)
//   useEffect(() => {
//   if (contests && contests.length) {
//     const formatted = contests.map((item) => ({
//       id: item._id || item.id,

//       title: item.title || "No Title",

//       // ✅ KEEP RAW DATE
//       startDate: item.startDate || "",
//       date: item.deadline || "",

//       participants:
//         Array.isArray(item.participants)
//           ? item.participants.length
//           : Array.isArray(item.users)
//           ? item.users.length
//           : 0,

//       status: item.status || "upcoming",
//     }));

//     setTableData(formatted);
//   }
// }, [contests]);
//   // ✅ RESET PAGE
//   useEffect(() => {
//     setPage(1);
//   }, [search, filter]);

//   // ✅ DELETE
//   const handleDelete = async (id) => {
//     try {
//       await deleteContestApi(id);

//       setTableData((prev) =>
//         prev.filter((item) => item.id !== id)
//       );

//       toast.success("🗑️ Contest deleted");
//     } catch {
//       toast.error("❌ Delete failed");
//     }
//   };

//   // ✅ EDIT OPEN
//   const handleEdit = (item) => {
//     setSelectedItem({ ...item });
//     setIsEditOpen(true);
//   };

//   // ✅ SAVE (UPDATED WITH STATUS)
//   const handleSave = async () => {
//   try {
//     const updatedItem = {
//       ...selectedItem,

//       // 🔥 IMPORTANT MAPPING
//       deadline: selectedItem.date,
//       startDate: selectedItem.startDate,
//     };

//     await updateContestApi(selectedItem.id, updatedItem);

//     setTableData((prev) =>
//       prev.map((item) =>
//         item.id === selectedItem.id ? updatedItem : item
//       )
//     );

//     setIsEditOpen(false);
//     toast.success("✅ Contest updated");
//   } catch {
//     toast.error("❌ Update failed");
//   }
// };

//   // 🔍 FILTER
//   const filteredData = useMemo(() => {
//     let result = [...tableData];

//     if (search) {
//       result = result.filter((item) =>
//         item.title?.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (filter !== "all") {
//       result = result.filter((item) => item.status === filter);
//     }

//     return result;
//   }, [tableData, search, filter]);

//   // ✅ PAGINATION
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
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchContests,
  updateContest,
  deleteContest,
} from "../../../features/contestSlice";

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

  // ✅ MAP DATA FROM REDUX
  useEffect(() => {
    if (contests && contests.length) {
      const formatted = contests.map((item) => ({
        id: item._id,
        title: item.title || "No Title",
        startDate: item.startDate || "",
        date: item.deadline || "",
        participants: Array.isArray(item.users)
          ? item.users.length
          : 0,
        status: item.status || "upcoming",
      }));

      setTableData(formatted);
    }
  }, [contests]);

  // ✅ RESET PAGE
  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  // ✅ DELETE (Redux)
  const handleDelete = async (id) => {
    console.log("CLICKED DELETE", id);
  try {
    await dispatch(deleteContest(id)).unwrap();

    toast.success("🗑️ Contest deleted");
  } catch (err) {
    console.log("DELETE ERROR:", err);
    toast.error("❌ Delete failed");
  }
};

  // ✅ EDIT OPEN
  const handleEdit = (item) => {
    setSelectedItem({ ...item });
    setIsEditOpen(true);
  };

  // ✅ UPDATE (Redux)
  const handleSave = async () => {
  try {
    const payload = {
      title: selectedItem.title || "",
      startDate: selectedItem.startDate || "",
      deadline: selectedItem.date || "",
      status: selectedItem.status || "upcoming",
    };

    console.log("EDIT PAYLOAD:", payload);

    await dispatch(
      updateContest({
        id: selectedItem.id,
        data: payload,
      })
    ).unwrap();

    setIsEditOpen(false);
    toast.success("✅ Contest updated");

  } catch (err) {
    console.log("UPDATE ERROR:", err);
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