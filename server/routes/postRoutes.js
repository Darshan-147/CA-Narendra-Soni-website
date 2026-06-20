import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import { requireAdminKey } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/posts", getPosts);
router.post("/createPost", requireAdminKey, createPost);

export default router;
