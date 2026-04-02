import { useEffect, useState } from "react";
import { getStudentDashboard } from "./student.service";
import { STUDENT_CONFIG } from "./student.config";

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