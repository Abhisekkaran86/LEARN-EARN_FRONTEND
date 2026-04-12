import Hero from "@/features/home/components/Hero";
import WhyJoin from "@/features/home/components/WhyJoin";
import Challenges from "@/features/home/components/Challenges";
import ReviewSlider from "@/features/home/components/ReviewSlider";

const HomePage = () => {
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
