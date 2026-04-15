// import Hero from "@/features/home/components/Hero";
// import WhyJoin from "@/features/home/components/WhyJoin";
// import Challenges from "@/features/home/components/Challenges";
// import ReviewSlider from "@/features/home/components/ReviewSlider";

// const HomePage = () => {
//   return (
//     <main className="bg-white dark:bg-gray-950">

//       {/* HERO */}
//       <section className="relative">
//         <Hero />
//       </section>

//       {/* WHY JOIN */}
//       <section className="relative">
//         <WhyJoin />
//       </section>

//       {/* CHALLENGES */}
//       <section className="relative">
//         <Challenges />
//       </section>

//       {/* REVIEWS */}
//       <section className="relative">
//         <ReviewSlider />
//       </section>

//     </main>
//   );
// };

// export default HomePage;



import Hero from "@/features/home/components/Hero";
import WhyJoin from "@/features/home/components/WhyJoin";
import Challenges from "@/features/home/components/Challenges";
import ReviewSlider from "@/features/home/components/ReviewSlider";
import { useLoader } from "@/context/LoaderContext";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAuthRole } from "@/utils/authStorage";

const HomePage = () => {

  const { setDisableLoader } = useLoader();
  const role = getAuthRole();

  useEffect(() => {
    setDisableLoader(true);   // ❌ disable loader on home

    return () => {
      setDisableLoader(false); // ✅ enable again when leaving
    };
  }, [setDisableLoader]);

  if (role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <main className="bg-white dark:bg-gray-950">

      {/* HERO */}
      <section className="relative">
        <Hero />
      </section>

      {/* WHY JOIN */}
      <section className="relative">
        <WhyJoin />
      </section>

      {/* CHALLENGES */}
      <section className="relative">
        <Challenges />
      </section>

      {/* REVIEWS */}
      <section className="relative">
        <ReviewSlider />
      </section>

    </main>
  );
};

export default HomePage;


