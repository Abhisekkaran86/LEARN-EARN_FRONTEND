// sections/WhyJoin.jsx
import Container from "../components/Container";

const WhyJoin = () => {
  return (
    <section className="py-10 bg-[#eef2f7]"> {/* ⬅ more spacing */}
      <Container>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold">Why Join Us?</h2> {/* ⬅ bigger */}
          <p className="text-gray-500 mt-4 text-base">
            Experience an ecosystem designed to nurture talent and reward merit
            through precision-engineered academic pathways.
          </p>
        </div>

        {/* TOP GRID */}
        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {/* LEFT BIG CARD */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">

            <div className="flex-1">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#82c600]/10 text-[#82c600] text-xl">
                🎓
              </div>

              <h3 className="mt-5 font-semibold text-xl">
                Expert evaluation
              </h3>

              <p className="text-gray-500 text-base mt-3 max-w-md">
                Our judging panels consist of seasoned academics and industry
                veterans from across India. Get detailed feedback that helps you
                grow beyond just grades.
              </p>
            </div>

            {/* IMAGE */}
            <div className="w-full md:w-80 h-40 bg-gray-200 rounded-xl" />
          </div>

          {/* RIGHT BLUE CARD */}
          <div className="bg-[#82c600] text-white rounded-2xl p-8 shadow-md flex flex-col justify-between">

            <div>
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20 text-xl">
                🌍
              </div>

              <h3 className="mt-5 font-semibold text-xl">
                Global recognition
              </h3>

              <p className="text-base mt-3 opacity-90">
                Earn certificates and digital badges recognized globally.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm opacity-80">PARTNER SCHOOLS</p>
            </div>

          </div>

        </div>

        {/* BOTTOM CARD */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm flex items-start gap-6">

          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#82c600]/10 text-[#82c600] text-xl">
            📈
          </div>

          <div>
            <h3 className="font-semibold text-xl">
              Career growth
            </h3>

            <p className="text-gray-500 text-base mt-3 max-w-4xl">
              It’s not just about winning today. Building a portfolio signals
              your intellectual rigor and gives you an edge in your career journey.
            </p>
          </div>

        </div>

      </Container>
    </section>
  );
};

export default WhyJoin;