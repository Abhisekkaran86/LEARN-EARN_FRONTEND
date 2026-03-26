// sections/Challenges.jsx
import Container from "../components/Container";
import Button from "../components/ui/Button";
import { challenges } from "../data/challengesData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const Challenges = () => {
  return (
    <section className="py-24 bg-[#f6f7fb]">
      <Container>

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Active Challenges</h2>
            <p className="text-gray-500 text-sm mt-1">
              Explore live contests and boost your skills
            </p>
          </div>

          <Button variant="ghost" full={false}>
            View all →
          </Button>
        </div>

        {/* SLIDER */}
        <div className="mt-10">

          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {challenges.map((item, i) => (
              <SwiperSlide key={i}>

                <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

                  {/* IMAGE */}
                  <div
                    className="h-44 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />

                  {/* CONTENT */}
                  <div className="p-5">

                    <span className="text-xs bg-[#82c600]/10 text-[#82c600] px-2 py-1 rounded">
                      {item.category}
                    </span>

                    <h3 className="font-semibold mt-3">
                      {item.title}
                    </h3>

                    <p className="text-[#82c600] mt-2 font-medium">
                      {item.prize}
                    </p>

                    <Button size="sm" className="mt-4">
                      View Details
                    </Button>

                  </div>

                </div>

              </SwiperSlide>
            ))}
          </Swiper>

        </div>

      </Container>
    </section>
  );
};

export default Challenges;