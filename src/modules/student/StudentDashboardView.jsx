import Card from "../../components/ui/Card";

const StudentDashboardView = ({ data, config }) => {
  if (!data) return <p>Loading...</p>;

  const { user, featured, participation, deadlines, progress } = data;

  return (
    <div className="bg-[#f8fafc] min-h-screen p-4 md:p-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-[#82C600] to-[#6ea800] text-white rounded-2xl p-6 md:p-8 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          {config.hero.title.replace("{name}", user.name)}
        </h1>

        <p className="mt-2 text-sm md:text-base opacity-90">
          {config.hero.subtitle.replace("{active}", user.active)}
        </p>

        <div className="flex gap-4 mt-5 flex-wrap">
          {config.stats.map((item, i) => (
            <div key={i} className="bg-white/20 px-4 py-2 rounded-xl">
              <p className="text-xs">{item.label}</p>
              <p className="font-semibold">{user[item.key]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* FEATURED */}
          <div>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {config.featured.title}
              </h2>
              <span className="text-[#82C600] text-sm cursor-pointer">
                {config.featured.action}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {featured.map((item, i) => (
                <Card key={i} className="overflow-hidden p-0">
                  <div className="h-40 bg-gray-200"></div>

                  <div className="p-4">
                    <div className="flex gap-2 text-xs mb-2">
                      <span className="bg-[#82C600]/20 text-[#82C600] px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <span className="bg-[#FFD700]/30 px-2 py-1 rounded">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>

                    <button className="mt-4 w-full bg-[#82C600] text-white py-2 rounded-xl hover:bg-[#6ea800]">
                      Participate Now
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* PARTICIPATION */}
          <Card>
            <h2 className="font-semibold mb-4">
              {config.participation.title}
            </h2>

            {participation.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b last:border-none">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.subtitle}</p>
                </div>

                <span className={`text-xs px-3 py-1 rounded-full ${
                  item.status === "submitted"
                    ? "bg-[#82C600]/20 text-[#82C600]"
                    : item.status === "pending"
                    ? "bg-[#FFD700]/30"
                    : "bg-blue-100 text-blue-600"
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* DEADLINES */}
          <Card>
            <h3 className="font-semibold mb-3">
              {config.sidebar.deadlines}
            </h3>

            {deadlines.map((d, i) => (
              <div key={i} className="flex gap-3 mb-3">
                <div className="bg-gray-100 px-2 py-1 rounded text-xs text-center">
                  <p className="font-bold">{d.date}</p>
                  <p>{d.month}</p>
                </div>

                <div>
                  <p className="text-sm font-medium">{d.title}</p>
                  {d.time && (
                    <p className="text-xs text-red-500">
                      Closes in {d.time}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Card>

          {/* PROGRESS */}
          <Card>
            <h3 className="font-semibold mb-3">
              {config.sidebar.progress}
            </h3>

            {progress.map((p, i) => (
              <div key={i} className="mb-3">
                <p className="text-xs">{p.label}</p>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-[#82C600]"
                    style={{ width: `${p.value}%` }}
                  />
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardView;