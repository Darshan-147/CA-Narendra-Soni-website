import { useState } from "react";
import api from "../api/api.js";
import { sendEnquiryEmail } from "../api/email.js";

const SERVICE_OPTIONS = [
  "Company Setup",
  "Taxation",
  "Auditing & Assurance",
  "Financial Advisory",
  "GST & Compliance",
  "Other",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "Company Setup",
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", message: string }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const [contactResult, emailResult] = await Promise.allSettled([
        api.post("/contact", form),
        sendEnquiryEmail(form),
      ]);

      if (emailResult.status === "rejected") {
        const savedMessage =
          contactResult.status === "fulfilled"
            ? " Your enquiry was saved, but the email could not be sent."
            : "";

        throw new Error(
          `${emailResult.reason?.message || "Email could not be sent."}${savedMessage}`,
        );
      }

      const saveWarning =
        contactResult.status === "rejected"
          ? " Email sent successfully, but the enquiry could not be saved in the database."
          : "";

      setStatus({
        type: "success",
        message:
          `Thank you. Your enquiry has been emailed to Narendra Soni.${saveWarning}`,
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong while submitting your enquiry. Please check the EmailJS configuration and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container contact__inner">
        <div className="contact__info">
          <p className="eyebrow">Get In Touch</p>
          <h2 className="section-heading">
            Schedule a consultation with Narendra Soni
          </h2>
          <p className="section-intro">
            Tell us a little about your requirement and the support you need.
            Your enquiry will be emailed directly for follow-up.
          </p>

          <div className="contact__info-item">
            <span>Phone</span>
            <a href="tel:+919712974759">+91 97129 74759</a>
          </div>
          <div className="contact__info-item">
            <span>Email</span>
            <a href="mailto:canks2013@gmail.com">canks2013@gmail.com</a>
          </div>
          <div className="contact__info-item">
            <span>Office</span>
            <p>204, Second Floor, Avani Icon Opp. Swami Narayan Temple, Haridarshan Char Rasta, Nava Naroda, Ahmedabad</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 00000 00000"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="service">Service Interested In</label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
              >
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="message">How can we help?</label>
            <textarea
              id="message"
              name="message"
              placeholder="Briefly describe your requirement..."
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-submit">
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? "Sending..." : "Send Enquiry"}
            </button>
            {status && (
              <span
                className={`form-status ${
                  status.type === "success"
                    ? "form-status--success"
                    : "form-status--error"
                }`}
                role="status"
              >
                {status.message}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
