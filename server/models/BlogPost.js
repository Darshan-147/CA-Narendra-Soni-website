import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    author: {
      type: String,
      default: "Editorial Team",
    },
    coverImage: {
      type: String,
      default: "",
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BlogPost", blogPostSchema);
