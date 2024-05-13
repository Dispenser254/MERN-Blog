import express from "express";
import { verifyToken } from "../utils/verifyUser";
import { create, deletepost, getposts } from "../controllers/post.controller";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get('/getposts', getposts)
router.delete('deletepost/:postId/:userId', verifyToken, deletepost)

export default router;
