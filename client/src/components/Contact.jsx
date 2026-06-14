import { useState } from "react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
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

const countries = getCountries().map((country) => ({
  country,
  code: `+${getCountryCallingCode(country)}`,
}));

const initialForm = {
  name: "",
  email: "",
  countryCode: "+91",
  phone: "",
  service: "Company Setup",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\d{5} \d{5}$/;

const groupLocalPhoneDigits = (digits) =>
  [digits.slice(0, 5), digits.slice(5, 10)].filter(Boolean).join(" ");

const formatPhoneNumber = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  return groupLocalPhoneDigits(digits);
};

const validateForm = (formData) => {
  const nextErrors = {};
  const fullName = formData.name.trim();
  const email = formData.email.trim();
  const message = formData.message.trim();

  if (!fullName) {
    nextErrors.name = "Please enter your full name.";
  } else if (fullName.length < 5) {
    nextErrors.name = "Full name must be at least 5 characters.";
  }

  if (!email) {
    nextErrors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    nextErrors.email = "Please enter a valid email address.";
  }

  if (formData.phone && !PHONE_PATTERN.test(formData.phone)) {
    nextErrors.phone = "Enter a 10-digit phone number, like 12345 67890.";
  }

  if (
    formData.phone &&
    !countries.some((option) => option.code === formData.countryCode)
  ) {
    nextErrors.phone = "Please select a valid country code.";
  }

  if (!SERVICE_OPTIONS.includes(formData.service)) {
    nextErrors.service = "Please select a valid service.";
  }

  if (!message) {
    nextErrors.message = "Please describe your requirement.";
  } else if (message.length < 10) {
    nextErrors.message = "Description must be at least 10 characters.";
  }

  return nextErrors;
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", message: string }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === "phone" ? formatPhoneNumber(value) : value;

    setForm((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const { [name]: _removed, ...rest } = prev;
      return rest;
    });
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({
        type: "error",
        message: "Please fix the highlighted fields before sending.",
      });
      return;
    }

    if (submitting) return;

    setSubmitting(true);
    setStatus(null);

    try {
      const normalizedForm = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone ? `${form.countryCode} ${form.phone}` : "",
        service: form.service,
        message: form.message.trim(),
      };

      const [contactResult, emailResult] = await Promise.allSettled([
        api.post("/contact", normalizedForm),
        sendEnquiryEmail(normalizedForm),
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
        message: `Thank you. Your enquiry has been emailed to Narendra Soni.${saveWarning}`,
      });
      setForm(initialForm);
      setErrors({});
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
            <p>
              204, Second Floor, Avani Icon Opp. Swami Narayan Temple,
              Haridarshan Char Rasta, Nava Naroda, Ahmedabad
            </p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
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
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p className="form-error" id="name-error">
                  {errors.name}
                </p>
              )}
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
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p className="form-error" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="phone">Phone Number</label>
              <div className="phone-control">
                <select
                  id="countryCode"
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleChange}
                  aria-label="Country code"
                >
                  {countries.map((option) => (
                    <option key={option.country} value={option.code}>
                      {option.country} {option.code}
                    </option>
                  ))}
                </select>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="00000 00000"
                  value={form.phone}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
              </div>
              {errors.phone && (
                <p className="form-error" id="phone-error">
                  {errors.phone}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="service">Service Interested In</label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? "service-error" : undefined}
              >
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="form-error" id="service-error">
                  {errors.service}
                </p>
              )}
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
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            ></textarea>
            {errors.message && (
              <p className="form-error" id="message-error">
                {errors.message}
              </p>
            )}
          </div>

          <div className="form-submit">
            <button type="submit" className="btn btn--primary">
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
