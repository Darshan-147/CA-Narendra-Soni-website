import Post from "../models/Post.js";

// @desc    Create a post from a LinkedIn update
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { title, excerpt, category, linkedinUrl, date } = req.body;

    if (!title || !excerpt || !linkedinUrl || !date) {
      return res.status(400).json({
        success: false,
        message: "Title, excerpt, LinkedIn URL and date are required.",
      });
    }

    const postDate = new Date(date);
    if (Number.isNaN(postDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid post date.",
      });
    }

    const post = await Post.create({
      title,
      excerpt,
      category,
      linkedinUrl,
      date: postDate,
    });

    return res.status(201).json({
      success: true,
      message: "Post saved successfully.",
      data: post,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(" ") });
    }

    console.error("createPost error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to save this post. Please try again later.",
    });
  }
};

// @desc    Get all LinkedIn posts (newest first)
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 0;
    let query = Post.find().sort({ date: -1, createdAt: -1 });
    if (limit > 0) query = query.limit(limit);

    const posts = await query.exec();
    return res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    console.error("getPosts error:", error.message);
    return res.status(500).json({ success: false, message: "Unable to fetch posts." });
  }
};
