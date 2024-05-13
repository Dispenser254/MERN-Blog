import express from "express";
import { verifyToken } from "../utils/verifyUser";
import { create, deletepost, getposts, updatepost } from "../controllers/post.controller";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get('/getposts', getposts)
router.put('/updatepost/:postId/:userId', verifyToken, updatepost)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)

export default router;
