import {
  IconGlobe,
  IconLedger,
  IconScale,
  IconShield,
  IconChart,
  IconBuilding,
  IconTransfer,
  IconUser,
  IconGavel,
} from "./icons.jsx";

const SERVICES = [
  {
    icon: <IconShield />,
    title: "Auditing & Assurance",
    description:
      "Support for statutory audits, tax audits and internal reviews with clear documentation and practical reporting.",
  },
  {
    icon: <IconGavel />,
    title: "Tax Notices & Representation",
    description:
      "Preparation, response and representation support for income tax, GST and other regulatory notices.",
  },
  {
    icon: <IconChart />,
    title: "Financial Advisory",
    description:
      "Practical financial guidance covering reporting, budgeting, cash-flow planning and business decision support.",
  },
  {
    icon: <IconLedger />,
    title: "Business Taxation",
    description:
      "Income tax, GST, TDS and return filing support for businesses, professionals and individuals.",
  },
  {
    icon: <IconBuilding />,
    title: "Company Formation",
    description:
      "Incorporation assistance for private limited companies, LLPs and other business structures.",
  },
  {
    icon: <IconUser />,
    title: "Individual Tax Filing",
    description:
      "Income tax return filing, capital gains reporting and tax planning support for individuals and families.",
  },
  {
    icon: <IconScale />,
    title: "Corporate Compliance",
    description:
      "Companies Act compliance, secretarial services, statutory registers and annual filings to keep your business in good standing.",
  },
];

const Services = () => {
  return (
    <section className="section section--alt" id="services">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Our Services</p>
            <h2 className="section-heading">
              Professional support for accounting, taxation and compliance
            </h2>
            <p className="section-intro">
              From business setup to ongoing tax, audit, accounting and
              statutory compliance, Narendra Soni provides dependable CA support
              under one roof.
            </p>
          </div>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <article className="service-card" key={service.title}>
              <span className="service-card__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="service-card__icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#contact" className="service-card__link">
                Enquire about this -&gt;
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
