import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import { requireAdminKey } from "../middleware/adminAuth.js";

const router = express.Router();

router.route("/").get(getPosts).post(requireAdminKey, createPost);

export default router;
