import { useEffect, useState } from "react";
import API from "../../../services/axios";

const Approval = () => {
  const [reqs, setReqs] = useState([]);

  useEffect(() => {
    API.get("/teams/requests").then((res) =>
      setReqs(res.data.requests)
    );
  }, []);

  const approve = async (id) => {
    await API.post(`/teams/approve/${id}`);
  };

  return (
    <div>
      {reqs.map((r) => (
        <div key={r._id}>
          <p>{r.team.teamName}</p>
          <button onClick={() => approve(r._id)}>
            Approve
          </button>
        </div>
      ))}
    </div>
  );
};

export default Approval;