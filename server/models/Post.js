import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 180,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
      maxlength: 280,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
      maxlength: 80,
    },
    linkedinUrl: {
      type: String,
      required: [true, "LinkedIn URL is required"],
      trim: true,
      validate: {
        validator(value) {
          try {
            const url = new URL(value);
            return (
              ["http:", "https:"].includes(url.protocol) &&
              url.hostname.includes("linkedin.com")
            );
          } catch {
            return false;
          }
        },
        message: "Please enter a valid LinkedIn URL",
      },
    },
    date: {
      type: Date,
      required: [true, "Post date is required"],
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema, "posts");
