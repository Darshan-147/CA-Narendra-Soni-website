import "./Process.css";

const STEPS = [
  {
    number: "01",
    title: "Consult",
    description:
      "We start by understanding your requirement, current records, business structure and compliance position.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "A clear scope is prepared for taxation, audit, accounting, registration or advisory work with expected timelines.",
  },
  {
    number: "03",
    title: "Execute",
    description:
      "Required filings, documents, reconciliations and submissions are prepared with regular updates.",
  },
  {
    number: "04",
    title: "Review",
    description:
      "Ongoing reporting and periodic reviews help your business stay compliant and informed, year after year.",
  },
];

const Process = () => {
  return (
    <section className="section" id="process">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">How We Work</p>
            <h2 className="section-heading">A simple, transparent engagement process</h2>
            <p className="section-intro">
              Every engagement, from a single ITR filing to ongoing business
              compliance, follows the same disciplined process.
            </p>
          </div>
        </div>

        <div className="process-list">
          {STEPS.map((step) => (
            <div className="process-step" key={step.number}>
              <span className="process-step__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
