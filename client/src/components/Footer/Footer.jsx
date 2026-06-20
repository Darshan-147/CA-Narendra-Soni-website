import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="logo">
              <span className="logo__mark">NS</span>
              <span className="logo__text">
                <strong style={{ color: "#f8f5ee" }}>Narendra Soni</strong>
                <span>Chartered Accountant</span>
              </span>
            </a>
            <p>
              Professional Chartered Accountancy services for taxation, audit,
              accounting, business compliance and company formation.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#insights">Insights</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>
                <a href="#services">Business Taxation</a>
              </li>
              <li>
                <a href="#services">Auditing &amp; Assurance</a>
              </li>
              <li>
                <a href="#services">Company Formation</a>
              </li>
              <li>
                <a href="#services">Financial Advisory</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Reach Us</h4>
            <ul>
              <li>
                204, Second Floor, Avani Icon Opp. Swami Narayan Temple,
                Haridarshan Char Rasta, Nava Naroda, Ahmedabad
              </li>
              <li>
                <a href="tel:+919712974759">+91 97129 74759</a>
              </li>
              <li>
                <a href="mailto: canks2013@gmail.com">canks2013@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} Narendra Soni. All rights reserved.</span>
          <div className="footer-socials" aria-label="Social media links">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/canarendra-soni/"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
        </div>

        <p className="footer-disclaimer">
          Disclaimer: Narendra Soni is a Chartered Accountant and is not
          affiliated with any government authority. Information on this website
          is for general awareness and should not be treated as professional
          advice without a consultation.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
