// components/Header.jsx
import Container from "../Container";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white border-b">
      <Container>

        <div className="flex items-center justify-between py-4">

          {/* LOGO */}
          <h1 className="font-bold text-lg">
            Scholastic <span className="text-[#82c600]">Luminary</span>
          </h1>

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#">Contests</a>
            <a href="#">Rankings</a>
            <a href="#">About</a>
            <a href="#">Support</a>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm text-gray-600">
              Sign In
            </Link>

            <Button full={false} size="sm">
              Get Started
            </Button>
          </div>

        </div>

      </Container>
    </header>
  );
};

export default Header;