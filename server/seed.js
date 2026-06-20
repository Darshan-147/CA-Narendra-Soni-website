import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Post from "./models/Post.js";

dotenv.config();

const posts = [
  {
    title: "Documents You Need to File Your Income Tax Return",
    excerpt:
      "Filing your Income Tax Return becomes far simpler when you keep the right paperwork ready in advance.",
    category: "Income Tax",
    linkedinUrl: "https://www.linkedin.com/posts/",
    date: new Date("2026-05-12"),
  },
  {
    title: "ITR-7 Filing for NGOs: A Complete Guide",
    excerpt:
      "Non-profits, charitable trusts and religious institutions enjoy tax exemptions, but only if their ITR-7 filing is accurate and on time.",
    category: "Compliance",
    linkedinUrl: "https://www.linkedin.com/posts/",
    date: new Date("2026-05-05"),
  },
  {
    title: "Business Registration in India: The Complete Guide",
    excerpt:
      "India is one of the fastest-growing economies in the world. Here's how to register your business correctly from day one.",
    category: "Business Setup",
    linkedinUrl: "https://www.linkedin.com/posts/",
    date: new Date("2026-04-22"),
  },
  {
    title: "Transfer Pricing in India: What Every Multinational Should Know",
    excerpt:
      "Cross-border transactions between related entities face close scrutiny. Here's how to stay compliant and audit-ready.",
    category: "Transfer Pricing",
    linkedinUrl: "https://www.linkedin.com/posts/",
    date: new Date("2026-03-30"),
  },
];

const run = async () => {
  await connectDB();
  try {
    await Post.deleteMany();
    await Post.insertMany(posts);
    console.log(`Seeded ${posts.length} posts.`);
  } catch (error) {
    console.error("Seeding error:", error.message);
  } finally {
    process.exit();
  }
};

run();
