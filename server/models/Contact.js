import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [5, "Name must be at least 5 characters"],
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 20,
      match: [
        /^$|^(?:\+\d{1,4} )?\d{5} \d{5}$/,
        "Please enter a valid phone number",
      ],
    },
    service: {
      type: String,
      enum: [
        "Company Setup",
        "Taxation",
        "Auditing & Assurance",
        "Financial Advisory",
        "GST & Compliance",
        "Other",
      ],
      default: "Other",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
