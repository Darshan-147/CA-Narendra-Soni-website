import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div>
          <p className="eyebrow">Chartered Accountant</p>
          <h1 className="hero__title">
            Accounts and finance professionals having expertise in IND AS
          </h1>
          <p className="hero__subtitle">
            Narendra Soni is a Chartered Accountant, ISA providing reliable
            support for taxation, audit and assurance, system audit and business
            compliance, accounting, company formation and financial advisory for
            individuals, professionals and growing businesses.
          </p>
          <div className="hero__actions">
            <a href="#services" className="btn btn--primary">
              Explore Services
            </a>
            <a href="#contact" className="btn btn--outline">
              Talk to an Expert
            </a>
          </div>
          <div className="hero__meta">
            <div>
              <strong>CA</strong>
              Qualified Professional
            </div>
            <div>
              <strong>Tax</strong>
              Filing & Advisory
            </div>
            <div>
              <strong>Audit</strong>
              Assurance Support
            </div>
            <div>
              <strong>GST</strong>
              Compliance Guidance
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="stamp">
            <span>Chartered</span>
            <span className="stamp__center">Narendra Soni</span>
            <span>Accountant</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
