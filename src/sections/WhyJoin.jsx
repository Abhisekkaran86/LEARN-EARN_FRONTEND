import Container from "../components/Container";

const WhyJoin = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#f8fafc] to-[#eef2f7]">
      <Container>

        {/* 🔥 PREMIUM HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Why{" "}
            <span className="bg-gradient-to-r from-[#82C600] to-[#a3e635] bg-clip-text text-transparent">
              Choose Us?
            </span>
          </h2>

          <p className="text-gray-500 mt-5 text-base md:text-lg">
            Experience a modern learning ecosystem designed to reward talent,
            boost growth, and unlock real-world opportunities 🚀
          </p>
        </div>

        {/* 🔥 TOP GRID */}
        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {/* LEFT BIG CARD */}
          <div className="lg:col-span-2 group bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

            <div className="flex-1">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#82c600]/10 text-[#82c600] text-2xl shadow-inner">
                🎓
              </div>

              <h3 className="mt-6 font-semibold text-2xl text-gray-800 group-hover:text-[#82c600] transition">
                Expert Evaluation
              </h3>

              <p className="text-gray-500 text-base mt-3 max-w-md leading-relaxed">
                Get evaluated by industry experts and academic leaders. Receive
                deep insights that help you grow beyond marks.
              </p>
            </div>

            {/* IMAGE */}
            <div className="w-full md:w-80 h-44 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl" />
          </div>

          {/* RIGHT GREEN CARD */}
          <div className="group bg-gradient-to-br from-[#82c600] to-[#a3e635] text-white rounded-3xl p-8 shadow-lg flex flex-col justify-between hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

            <div>
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/20 text-2xl">
                🌍
              </div>

              <h3 className="mt-6 font-semibold text-2xl">
                Global Recognition
              </h3>

              <p className="text-base mt-3 opacity-90 leading-relaxed">
                Earn certificates and digital badges recognized worldwide.
              </p>
            </div>

            <div className="mt-10">
              <p className="text-4xl font-bold">500+</p>
              <p className="text-sm opacity-80 tracking-wide">
                PARTNER SCHOOLS
              </p>
            </div>

          </div>

        </div>

        {/* 🔥 BOTTOM CARD */}
        <div className="mt-10 group bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex items-start gap-6">

          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#82c600]/10 text-[#82c600] text-2xl">
            📈
          </div>

          <div>
            <h3 className="font-semibold text-2xl text-gray-800 group-hover:text-[#82c600] transition">
              Career Growth
            </h3>

            <p className="text-gray-500 text-base mt-3 max-w-4xl leading-relaxed">
              Build a powerful portfolio, showcase your skills, and gain a
              competitive edge in your academic and professional journey.
            </p>
          </div>

        </div>

      </Container>
    </section>
  );
};

export default WhyJoin;