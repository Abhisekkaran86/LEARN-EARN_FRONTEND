import Card from "../components/ui/Card";

const rankings = [
  { name: "Aarav Sharma", points: 2450 },
  { name: "Riya Das", points: 2300 },
  { name: "Rahul Sen", points: 2100 },
];

const RankingsPage = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen p-4 md:p-6">

      <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>

      <Card>
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left py-3">Rank</th>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>

          <tbody>
            {rankings.map((user, i) => (
              <tr key={i} className="border-t text-center">
                <td className="py-3 font-semibold">
                  {i + 1}
                </td>

                <td>{user.name}</td>

                <td>
                  <span className="bg-[#82C600]/20 text-[#82C600] px-2 py-1 rounded">
                    {user.points}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default RankingsPage;