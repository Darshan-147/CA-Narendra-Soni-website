import emailjs from "@emailjs/browser";

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  toEmail: import.meta.env.VITE_EMAILJS_TO_EMAIL,
  toName: import.meta.env.VITE_EMAILJS_TO_NAME,
};

const getMissingConfig = () =>
  Object.entries({
    VITE_EMAILJS_SERVICE_ID: emailConfig.serviceId,
    VITE_EMAILJS_TEMPLATE_ID: emailConfig.templateId,
    VITE_EMAILJS_PUBLIC_KEY: emailConfig.publicKey,
    VITE_EMAILJS_TO_EMAIL: emailConfig.toEmail,
  })
    .filter(([, value]) => !value)
    .map(([key]) => key);

export const sendEnquiryEmail = async (form) => {
  const missingConfig = getMissingConfig();

  if (missingConfig.length > 0) {
    throw new Error(
      `EmailJS is missing required configuration: ${missingConfig.join(", ")}`,
    );
  }

  return emailjs.send(
    emailConfig.serviceId,
    emailConfig.templateId,
    {
      from_name: form.name,
      from_email: form.email,
      phone: form.phone || "Not provided",
      service: form.service,
      message: form.message,
      submitted_at: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    },
    {
      publicKey: emailConfig.publicKey,
    },
  );
};
