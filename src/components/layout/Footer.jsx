// components/Footer.jsx
import Container from "../Container";
import logo from "../../assets/Desun Logo1.png";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300 mt-16">

      <Container>

        {/* TOP */}
        <div className="py-12 grid md:grid-cols-4 gap-10">

          {/* 🔥 BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Desun Academy"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h2 className="font-bold text-white text-lg">
                  DESUN ACADEMY
                </h2>
                <p className="text-xs text-gray-400">
                  Get Placed by Skills
                </p>
              </div>
            </div>

            <p className="text-sm mt-4 text-gray-400 leading-relaxed">
              India's most advanced platform for student contests, real-world challenges, and career growth.
            </p>
          </div>

          {/* 🔥 LINKS 1 */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Platform
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-[#82c600] cursor-pointer">Contests</li>
              <li className="hover:text-[#82c600] cursor-pointer">Rankings</li>
              <li className="hover:text-[#82c600] cursor-pointer">Winners</li>
              <li className="hover:text-[#82c600] cursor-pointer">Certificates</li>
            </ul>
          </div>

          {/* 🔥 LINKS 2 */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-[#82c600] cursor-pointer">About Us</li>
              <li className="hover:text-[#82c600] cursor-pointer">Careers</li>
              <li className="hover:text-[#82c600] cursor-pointer">Blog</li>
              <li className="hover:text-[#82c600] cursor-pointer">Support</li>
            </ul>
          </div>

          {/* 🔥 LINKS 3 */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-[#82c600] cursor-pointer">Privacy Policy</li>
              <li className="hover:text-[#82c600] cursor-pointer">Terms of Service</li>
              <li className="hover:text-[#82c600] cursor-pointer">Cookie Policy</li>
              <li className="hover:text-[#82c600] cursor-pointer">Contact</li>
            </ul>
          </div>

        </div>

        {/* 🔥 DIVIDER */}
        <div className="border-t border-white/10"></div>

        {/* BOTTOM */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

          <p className="text-gray-400">
            © 2024 <span className="text-white font-medium">Desun Academy</span>. All rights reserved.
          </p>

          {/* SOCIAL / CTA */}
          <div className="flex items-center gap-4">
            <span className="text-gray-500">Follow us</span>

            <div className="flex gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#82c600] transition cursor-pointer">
                🌐
              </div>
              <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#82c600] transition cursor-pointer">
                📘
              </div>
              <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#82c600] transition cursor-pointer">
                🐦
              </div>
            </div>

          </div>

        </div>

      </Container>
    </footer>
  );
};

export default Footer;