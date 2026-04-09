// containers/HomeContainer.jsx
// import Hero from "../sections/Hero";
// import WhyJoin from "../sections/WhyJoin";
// import Challenges from "../sections/Challenges";
// import Audience from "../sections/Audience";

// const HomeContainer = () => {
//   return (
//     <>
//       <Hero />
//       <WhyJoin />
//       <Challenges />
//       <Audience />
//     </>
//   );
// };

// export default HomeContainer;

import Hero from "../sections/Hero";
import WhyJoin from "../sections/WhyJoin";
import Challenges from "../sections/Challenges";
import Audience from "../sections/Audience";
import ThemeToggle from "../components/ThemeToggle";
import ReviewSlider from "../sections/ReviewSlider";

const HomeContainer = () => {
  return (
    <main className="bg-white">

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

      {/* AUDIENCE */}
      <section className="relative">
        {/* <Audience /> */}

        <ReviewSlider/>
      </section>

    </main>
  );
};

export default HomeContainer;