import Contact from "../models/Contact.js";

// @desc    Submit a new contact / enquiry form
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      service,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Thank you. Your enquiry has been received. We will get back to you shortly.",
      data: contact,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(" ") });
    }
    console.error("createContact error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while submitting your enquiry. Please try again later.",
    });
  }
};

// @desc    Get all contact enquiries (for internal/admin use)
// @route   GET /api/contact
// @access  Public (intended to be protected behind auth in production)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    console.error("getContacts error:", error.message);
    return res.status(500).json({ success: false, message: "Unable to fetch enquiries." });
  }
};
