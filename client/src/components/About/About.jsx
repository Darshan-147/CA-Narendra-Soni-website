import profileImage from "../../assets/images/Profile_Image.jpg";
import "./About.css";

const About = () => {
  return (
    <section className="section" id="about">
      <div className="container about__inner">
        <div className="about__portrait">
          <div className="about__portrait-frame">
            <img
              src={profileImage}
              alt="Narendra Soni, Chartered Accountant"
              className="about__portrait-image"
            />
            <div className="about__portrait-card">
              <p className="name">Narendra Soni</p>
              <p className="role">Chartered Accountant</p>
            </div>
          </div>
        </div>

        <div className="about__content">
          <p className="eyebrow">About Narendra Soni</p>
          <h2 className="section-heading">
            A reliable Chartered Accountant for tax, audit and compliance
          </h2>
          <p>
            Narendra Soni provides professional Chartered Accountancy services
            for individuals, proprietors, partnerships, listed and unlisted
            companies and growing businesses. The practice focuses on clear
            advice, accurate documentation and timely compliance.
          </p>
          <p>
            From income tax return filing and GST compliance to audit
            support,Internal audit,MIS, System Audit and company registration,
            clients receive practical guidance aligned with Indian regulatory
            requirements.
          </p>
          <p>
            Every engagement is handled with attention to accuracy,
            confidentiality and responsiveness, helping clients stay organised
            through routine filings, financial decisions and statutory
            deadlines.
          </p>

          <div className="about__signatures">
            <div className="about__signature">
              <strong>Narendra Soni</strong>
              <span>Chartered Accountant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
