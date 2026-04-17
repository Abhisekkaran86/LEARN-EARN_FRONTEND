import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

import Container from "@/components/ui/Container";
import logo from "@/assets/Desun Logo1.png";

const CURRENT_YEAR = 2026;

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Contests", to: "/contests" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const platformLinks = [
  { label: "Student Login", to: "/login" },
  { label: "Create Account", to: "/signup" },
  { label: "Forgot Password", to: "/forgot-password" },
  { label: "Contest Hub", to: "/contests" },
];

const contactItems = [
  {
    icon: <FaEnvelope size={14} />,
    label: "Email",
    value: "support@contestplatform.com",
    href: "mailto:support@contestplatform.com",
  },
  {
    icon: <FaPhoneAlt size={14} />,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: <FaMapMarkerAlt size={14} />,
    label: "Location",
    value: "Kolkata, India",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: <FaFacebookF size={16} />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: <FaInstagram size={16} />,
  },
  {
    label: "GitHub",
    href: "https://github.com/Abhisekkaran86/LEARN-EARN_FRONTEND",
    icon: <FaGithub size={16} />,
  },
];

const Footer = () => {
  return (
    <footer className="theme-surface relative mt-16 overflow-hidden border-t transition-colors">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#82c600]/70 to-transparent" />
      <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-[#82c600]/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

      <Container className="relative">
        <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1.1fr]">
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="DESUN Academy"
                className="h-14 w-14 rounded-2xl object-contain ring-1 ring-[var(--theme-border)]"
              />
              <div>
                <p className="theme-text text-lg font-bold tracking-[0.18em]">
                  DESUN
                </p>
                <p className="text-sm font-medium text-[#a3e635]">Academy</p>
              </div>
            </Link>

            <p className="theme-text-soft mt-5 text-sm leading-7">
              DESUN Academy helps students learn faster, compete smarter, and
              grow through real contests, practical projects, and skill-based
              opportunities.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="theme-surface-muted theme-border theme-text-soft flex h-11 w-11 items-center justify-center rounded-2xl border transition hover:-translate-y-1 hover:border-[#82c600]/60 hover:bg-[#82c600] hover:text-slate-950"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="theme-text text-sm font-semibold uppercase tracking-[0.2em]">
              Quick Links
            </h3>
            <ul className="theme-text-soft mt-5 space-y-3 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="transition hover:text-[#82c600]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="theme-text text-sm font-semibold uppercase tracking-[0.2em]">
              Platform
            </h3>
            <ul className="theme-text-soft mt-5 space-y-3 text-sm">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="transition hover:text-[#82c600]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="theme-text text-sm font-semibold uppercase tracking-[0.2em]">
              Contact
            </h3>
            <ul className="mt-5 space-y-4">
              {contactItems.map(({ icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-3 text-sm">
                  <span className="theme-surface-muted mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#82c600] ring-1 ring-[var(--theme-border)]">
                    {icon}
                  </span>
                  <div className="min-w-0">
                    <p className="theme-text-muted text-xs uppercase tracking-[0.2em]">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="theme-text-soft mt-1 block break-words transition hover:text-[#82c600]"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="theme-text-soft mt-1">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="theme-border theme-text-soft flex flex-col gap-3 border-t py-5 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            Copyright {CURRENT_YEAR}{" "}
            <span className="theme-text font-medium">DESUN Academy</span>. All
            rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/about" className="transition hover:text-[#82c600]">
              About
            </Link>
            <Link to="/contact" className="transition hover:text-[#82c600]">
              Contact
            </Link>
            <Link to="/contests" className="transition hover:text-[#82c600]">
              Contests
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
