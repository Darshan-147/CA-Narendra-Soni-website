import dotenv from "dotenv";
import connectDB from "./config/db.js";
import BlogPost from "./models/BlogPost.js";

dotenv.config();

const posts = [
  {
    title: "Documents You Need to File Your Income Tax Return",
    slug: "documents-needed-to-file-income-tax-return",
    excerpt:
      "Filing your Income Tax Return becomes far simpler when you keep the right paperwork ready in advance — whether you're salaried, a freelancer, or a business owner.",
    content:
      "Filing your Income Tax Return (ITR) becomes much easier when you keep all the required documents ready in advance. Whether you are a salaried employee, freelancer, business owner, or investor, proper documentation helps ensure accurate filing and reduces the risk of notices from the tax department. Commonly required documents include Form 16, bank statements, investment proofs, capital gains statements, and details of any other income earned during the year. Our team can help you compile and review these documents before filing.",
    category: "Income Tax",
    author: "Tax Advisory Desk",
    coverImage: "",
    publishedAt: new Date("2026-05-12"),
  },
  {
    title: "ITR-7 Filing for NGOs: A Complete Guide",
    slug: "itr-7-filing-for-ngos-complete-guide",
    excerpt:
      "Non-profits, charitable trusts and religious institutions enjoy tax exemptions — but only if their ITR-7 filing is accurate and on time.",
    content:
      "Non-Governmental Organisations, charitable trusts, religious institutions and certain non-profit entities enjoy tax exemptions under the Income Tax Act. However, to claim these benefits and remain compliant, filing the correct ITR-7 form is essential. This guide walks through eligibility, the documents required, common mistakes to avoid, and key deadlines for the current assessment year. Our compliance team regularly assists trusts and societies with end-to-end ITR-7 preparation and filing.",
    category: "Compliance",
    author: "Compliance Desk",
    coverImage: "",
    publishedAt: new Date("2026-05-05"),
  },
  {
    title: "Business Registration in India: The Complete Guide",
    slug: "business-registration-in-india-complete-guide",
    excerpt:
      "India is one of the fastest-growing economies in the world. Here's how to register your business correctly from day one.",
    content:
      "India is a rapidly growing economy, and thanks to initiatives such as Startup India and Digital India, registering a business has become faster and more accessible than ever. This guide covers the most common business structures — private limited company, LLP, partnership and sole proprietorship — along with the registration process, statutory licences, and ongoing compliance obligations for each. Choosing the right structure early can save significant time and cost down the line.",
    category: "Business Setup",
    author: "Advisory Desk",
    coverImage: "",
    publishedAt: new Date("2026-04-22"),
  },
  {
    title: "Transfer Pricing in India: What Every Multinational Should Know",
    slug: "transfer-pricing-india-what-multinationals-should-know",
    excerpt:
      "Cross-border transactions between related entities face close scrutiny. Here's how to stay compliant and audit-ready.",
    content:
      "Transfer pricing regulations require that transactions between associated enterprises be conducted at arm's length. For multinational groups operating in India, this means maintaining contemporaneous documentation, benchmarking studies, and accountant's reports (Form 3CEB) each year. Non-compliance can lead to significant penalties and prolonged litigation. Our transfer pricing team supports clients with documentation, benchmarking, and representation before tax authorities.",
    category: "Transfer Pricing",
    author: "International Tax Desk",
    coverImage: "",
    publishedAt: new Date("2026-03-30"),
  },
];

const run = async () => {
  await connectDB();
  try {
    await BlogPost.deleteMany();
    await BlogPost.insertMany(posts);
    console.log(`Seeded ${posts.length} blog posts.`);
  } catch (error) {
    console.error("Seeding error:", error.message);
  } finally {
    process.exit();
  }
};

run();
