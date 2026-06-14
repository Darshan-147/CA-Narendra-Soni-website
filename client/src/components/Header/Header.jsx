import { useState } from "react";
import "./Header.css";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  // { label: "Commitments", href: "#testimonials" },
  { label: "Insights", href: "#insights" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleNavClick = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__top">
        <div className="container">
          <span>
            Chartered Accountant for taxation, audit, accounting and compliance
          </span>
          <a href="tel:+919712974759">+91 97129 74759</a>
        </div>
      </div>

      <div className="container site-header__nav">
        <a href="#top" className="logo" aria-label="Narendra Soni home">
          <span className="logo__mark">NS</span>
          <span className="logo__text">
            <strong>Narendra Soni</strong>
            <span>Chartered Accountant</span>
          </span>
        </a>

        <nav
          className={`nav-links ${open ? "is-open" : ""}`}
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={handleNavClick}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a href="#contact" className="btn btn--outline">
            Book a Consultation
          </a>
          <button
            className="menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
