import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] px-4 md:px-10 py-12">

      {/* 🔥 HERO HEADER */}
      <div className="relative mb-16 rounded-3xl overflow-hidden shadow-xl">

        <div className="absolute inset-0 bg-gradient-to-r from-[#82C600] via-[#a3e635] to-[#6ea800]" />

        <div className="absolute top-[-60px] right-[-60px] w-[220px] h-[220px] bg-white/20 blur-3xl rounded-full" />

        <div className="relative z-10 p-8 md:p-12 text-white">

          <h1 className="text-4xl md:text-5xl font-bold">
            Get in Touch With Us
          </h1>

          <p className="mt-4 text-sm md:text-base opacity-90 max-w-xl">
            Have questions, feedback, or need help? We’re here to support your journey 🚀
          </p>

        </div>
      </div>

      {/* 🔥 CONTACT GRID */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* 🔥 LEFT - CONTACT FORM */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-lg">

          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Send us a message
          </h2>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-xl border bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#82C600]"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-xl border bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#82C600]"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 rounded-xl border bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#82C600]"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition"
            >
              Send Message <FaPaperPlane />
            </button>

          </form>
        </div>

        {/* 🔥 RIGHT - CONTACT INFO */}
        <div className="space-y-6">

          {/* Email */}
          <div className="bg-white/70 backdrop-blur-xl border p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-[#82C600] text-xl" />
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-sm text-gray-500">
                  support@contestplatform.com
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white/70 backdrop-blur-xl border p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="flex items-center gap-4">
              <FaPhone className="text-[#82C600] text-xl" />
              <div>
                <h3 className="font-semibold text-gray-800">Phone</h3>
                <p className="text-sm text-gray-500">
                  +91 98765 43210
                </p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white/70 backdrop-blur-xl border p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-[#82C600] text-xl" />
              <div>
                <h3 className="font-semibold text-gray-800">Location</h3>
                <p className="text-sm text-gray-500">
                  Kolkata, India
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 🔥 CTA */}
      <div className="mt-16 bg-gradient-to-r from-[#82C600] to-[#a3e635] p-10 rounded-3xl text-center text-white shadow-lg">

        <h2 className="text-2xl font-bold">
          Need Immediate Help?
        </h2>

        <p className="mt-2 text-sm opacity-90">
          Our team is available 24/7 to assist you with any queries.
        </p>

        <button className="mt-6 px-6 py-3 bg-[#fbd300] text-black rounded-xl font-semibold hover:scale-105 transition">
          Contact Support →
        </button>

      </div>

    </div>
  );
};

export default ContactPage;