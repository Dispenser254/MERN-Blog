import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (request, response, next) => {
  try {
    const { content, postId, userId } = request.body;
    if (userId !== request.user.id) {
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    response.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};
