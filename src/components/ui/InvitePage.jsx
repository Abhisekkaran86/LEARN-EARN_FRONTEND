import { useEffect, useState } from "react";
import API from "@/services/axios";

const InvitePage = () => {
  const [invites, setInvites] = useState([]);

  const fetchInvites = async () => {
    const res = await API.get("/invitations/my");
    setInvites(res.data.invites);
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  const accept = async (token) => {
    await API.post(`/invitations/accept/${token}`);
    fetchInvites();
  };

  const reject = async (token) => {
    await API.post(`/invitations/reject/${token}`);
    fetchInvites();
  };

  return (
    <div>
      {invites.map((i) => (
        <div key={i._id}>
          {i.team.teamName}
          <button onClick={() => accept(i.token)}>Accept</button>
          <button onClick={() => reject(i.token)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default InvitePage;