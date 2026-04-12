import { useEffect, useState } from "react";
import { getStudentDashboard } from "@/features/student/studentAPI";
import { STUDENT_CONFIG } from "@/features/student/studentConfig";

const useStudentDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getStudentDashboard();
      setData(res);
    };
    fetchData();
  }, []);

  return {
    data,
    config: STUDENT_CONFIG,
  };
};

export default useStudentDashboard;