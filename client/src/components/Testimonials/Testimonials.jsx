import "./Testimonials.css";

const COMMITMENTS = [
  {
    quote:
      "Clear communication, practical advice and timely updates so you always know what is required and what has been filed.",
    name: "Timely Compliance",
    role: "Tax, GST, TDS and statutory deadlines",
  },
  {
    quote:
      "Careful review of documents, reconciliations and returns to reduce avoidable errors and keep records audit-ready.",
    name: "Accurate Documentation",
    role: "Books, returns, audit support and filings",
  },
  {
    quote:
      "Professional handling of financial and tax information with the confidentiality expected from a Chartered Accountant.",
    name: "Confidential Advice",
    role: "Individual, professional and business clients",
  },
];

const Testimonials = () => {
  return (
    <section className="section section--ink" id="testimonials">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Client Commitments</p>
            <h2 className="section-heading">What you can expect from the practice</h2>
            <p className="section-intro">
              The practice is built around dependable service, clear records
              and professional guidance for every engagement.
            </p>
          </div>
        </div>

        <div className="testimonial-grid">
          {COMMITMENTS.map((item) => (
            <figure className="testimonial-card" key={item.name}>
              <span className="testimonial-card__mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="testimonial-card__quote">
                {item.quote}
              </blockquote>
              <figcaption className="testimonial-card__author">
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
