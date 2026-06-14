import BlogPost from "../models/BlogPost.js";

// @desc    Get all blog/insight posts (newest first)
// @route   GET /api/blog
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 0;
    let query = BlogPost.find().sort({ publishedAt: -1 });
    if (limit > 0) query = query.limit(limit);

    const posts = await query.exec();
    return res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    console.error("getPosts error:", error.message);
    return res.status(500).json({ success: false, message: "Unable to fetch insights." });
  }
};

// @desc    Get a single blog/insight post by slug
// @route   GET /api/blog/:slug
// @access  Public
export const getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found." });
    }
    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error("getPostBySlug error:", error.message);
    return res.status(500).json({ success: false, message: "Unable to fetch this post." });
  }
};
