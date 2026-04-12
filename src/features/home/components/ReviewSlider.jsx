import { useEffect, useRef } from "react";

const reviews = [
  { name: "Amit Sharma", college: "Delhi University", text: "This platform boosted my confidence! Loved the contest experience.", rating: 5 },
  { name: "Priya Verma", college: "Jadavpur University", text: "Amazing learning + earning combo. Highly recommended!", rating: 5 },
  { name: "Rahul Das", college: "IIT Kharagpur", text: "Real-world exposure and great evaluation system.", rating: 4 },
  { name: "Sneha Kapoor", college: "Mumbai University", text: "The UI and contests are super engaging 🔥", rating: 5 },
  { name: "Arjun Singh", college: "BHU", text: "Best platform for students to showcase skills.", rating: 5 },
  { name: "Neha Gupta", college: "Amity University", text: "Loved the rewards and recognition system!", rating: 4 },
  { name: "Rohit Roy", college: "Calcutta University", text: "Smooth experience and amazing contests.", rating: 5 },
  { name: "Anjali Mehta", college: "SRM University", text: "Very helpful for career growth.", rating: 4 },
  { name: "Karan Patel", college: "NIT Surat", text: "Learn & Earn is truly innovative.", rating: 5 },
  { name: "Pooja Nair", college: "Kerala University", text: "Best student contest platform in India 🇮🇳", rating: 5 },
  { name: "Vikram Reddy", college: "Osmania University", text: "Loved competing with top students!", rating: 4 },
  { name: "Simran Kaur", college: "Punjab University", text: "Great exposure and real rewards.", rating: 5 },
  { name: "Aditya Mishra", college: "Lucknow University", text: "Very motivating platform!", rating: 4 },
  { name: "Meera Iyer", college: "Anna University", text: "Clean UI and smooth experience.", rating: 5 },
  { name: "Sahil Khan", college: "Jamia Millia Islamia", text: "One of the best platforms I used.", rating: 5 },
  { name: "Riya Sen", college: "Presidency University", text: "Loved the evaluation feedback system.", rating: 5 },
  { name: "Harsh Jain", college: "BITS Pilani", text: "Top quality contests and learning.", rating: 5 },
  { name: "Tanvi Joshi", college: "Pune University", text: "Helped me improve my skills fast.", rating: 4 },
  { name: "Deepak Yadav", college: "DU", text: "Super smooth and professional UI.", rating: 5 },
  { name: "Nikita Sharma", college: "Christ University", text: "Highly addictive learning platform 😍", rating: 5 },
];

const ReviewSlider = () => {
  const sliderRef = useRef();
  const isPausedRef = useRef(false);

  useEffect(() => {
    const slider = sliderRef.current;
    let animationFrame;
    let lastTime = 0;

    const baseSpeed = 0.04; // 🔥 ultra smooth speed

    const slide = (time) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (!isPausedRef.current && slider) {
        // 🔥 easing for natural motion
        const ease = 1 - Math.pow(0.995, delta);
        const move = delta * baseSpeed * (1 + ease);

        slider.scrollLeft += move;

        // 🔥 seamless infinite loop
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft -= slider.scrollWidth / 2;
        }
      }

      animationFrame = requestAnimationFrame(slide);
    };

    animationFrame = requestAnimationFrame(slide);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const getInitials = (name) =>
    name.split(" ").map((n) => n[0]).join("");

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#f6ffe8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Student Reviews 💬
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Real feedback from Learn & Earn Contest participants
          </p>
        </div>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          onMouseEnter={() => (isPausedRef.current = true)}
          onMouseLeave={() => (isPausedRef.current = false)}
          className="flex gap-6 overflow-x-auto no-scrollbar slider-container"
        >
          {[...reviews, ...reviews].map((item, index) => (
            <div
              key={index}
              className="min-w-[300px] sm:min-w-[340px] 
              rounded-3xl p-[1px] 
              bg-gradient-to-r from-[#82c600] via-[#a3e635] to-[#fbd300]"
            >
              <div className="h-full bg-white/80 backdrop-blur-xl 
              rounded-3xl p-6 
              border border-white/40 
              shadow-lg 
              hover:shadow-[0_15px_40px_rgba(130,198,0,0.3)]
              transition duration-500 hover:-translate-y-2">

                {/* USER */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center 
                  rounded-full bg-gradient-to-br from-[#82c600] to-[#a3e635] 
                  text-white font-bold">
                    {getInitials(item.name)}
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {item.college}
                    </p>
                  </div>
                </div>

                {/* TEXT */}
                <p className="text-gray-600 text-sm leading-relaxed mt-4">
                  "{item.text}"
                </p>

                {/* RATING */}
                <div className="flex mt-4 text-yellow-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 🔥 PERFORMANCE CSS */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .slider-container {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
};

export default ReviewSlider;