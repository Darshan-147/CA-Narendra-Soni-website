const STATS = [
  { label: "Professional Qualification", value: "CA, ISA" },
  { label: "Taxation Support", value: "ITR, Litigation" },
  { label: "Indirect Tax Compliance", value: "GST" },
  { label: "Assurance Services", value: "Auditing" },
  { label: "Business Setup Support", value: "MCA" },
  { label: "Advisory Approach", value: "Practical" },
];

const Stats = () => {
  return (
    <section className="ledger">
      <div className="container">
        <div className="ledger__header">
          <h2>Reliable advice. Organised compliance.</h2>
          <span>Practice Overview - FY 2025-26</span>
        </div>
        <div className="ledger-grid">
          {STATS.map((stat) => (
            <div className="ledger-row" key={stat.label}>
              <span className="ledger-row__label">{stat.label}</span>
              <span className="ledger-row__dots" aria-hidden="true"></span>
              <span className="ledger-row__value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
