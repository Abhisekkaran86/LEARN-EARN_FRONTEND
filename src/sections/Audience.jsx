// sections/Audience.jsx
import Container from "../components/Container";
import Button from "../components/ui/Button";

const Audience = () => {
  return (
    <section className="py-15 m-3.5 bg-[#eef2f7]">
      <Container>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* STUDENT CARD */}
          <div className="relative bg-white p-8 rounded-2xl shadow-sm overflow-hidden">

            {/* BACKGROUND CIRCLE */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#82c600]/10 rounded-full blur-2xl"></div>

            {/* ICON */}
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#82c600]/10 text-[#82c600] text-xl">
              🎓
            </div>

            {/* TITLE */}
            <h3 className="text-xl font-semibold mt-4">
              For Students
            </h3>

            {/* DESC */}
            <p className="text-gray-500 text-sm mt-2">
              Ready to show what you can do? Sign up to create your academic
              profile, track your progress, and get matched with contests that
              fit your interests.
            </p>

            {/* LIST */}
            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-[#82c600]">✔</span>
                Personalized Dashboards
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#82c600]">✔</span>
                Build Academic Portfolio
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#82c600]">✔</span>
                Exclusive Learning Resources
              </li>
            </ul>

            {/* BUTTON */}
            <Button full className="mt-8">
              Join as a Student
            </Button>

          </div>

          {/* ADMIN CARD */}
          <div className="relative bg-white p-8 rounded-2xl shadow-sm overflow-hidden">

            {/* BACKGROUND CIRCLE */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200 rounded-full blur-2xl"></div>

            {/* ICON */}
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#82c600]/10 text-[#82c600] text-xl">
              🏫
            </div>

            {/* TITLE */}
            <h3 className="text-xl font-semibold mt-4">
              For Admins
            </h3>

            {/* DESC */}
            <p className="text-gray-500 text-sm mt-2">
              Represent a school or an institution? Partner with us to host your
              own challenges or nominate your students for global events.
            </p>

            {/* LIST */}
            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-[#82c600]">✔</span>
                Bulk Student Management
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#82c600]">✔</span>
                Custom Contest Hosting
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#82c600]">✔</span>
                Detailed Performance Analytics
              </li>
            </ul>

            {/* BUTTON */}
            <Button
              full className="mt-8"
            >
              Request Institution Access
            </Button>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default Audience;