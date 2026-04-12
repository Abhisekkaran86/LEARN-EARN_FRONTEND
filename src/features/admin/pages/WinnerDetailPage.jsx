import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../../services/axios";

const WinnerDetailPage = () => {
  const { id } = useParams();
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const fetchWinner = async () => {
      try {
        const res = await API.get(`/submission/winner/${id}`);

        console.log("WINNER DETAIL:", res.data);

        const data =
          res?.data?.winner ||
          res?.data?.data ||
          res?.data;

        setWinner(data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchWinner();
  }, [id]);

  if (!winner) {
    return <div className="p-6 text-gray-400">Loading...</div>;
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6 text-lime-600">
        🏆 Winner Details
      </h1>

      <div className="p-6 border rounded-xl shadow">

        <p><b>Contest:</b> {winner.contestTitle}</p>

        <p><b>Student Name:</b> {winner.student?.name}</p>

        <p><b>Email:</b> {winner.student?.email}</p>

        <p><b>Score:</b> {winner.totalScore}</p>

        <p><b>Feedback:</b> {winner.feedback}</p>

        <p><b>GitHub:</b> {winner.githubLink}</p>

        <p><b>Live URL:</b> {winner.liveUrl}</p>

      </div>

    </div>
  );
};

export default WinnerDetailPage;