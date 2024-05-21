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

export const getpostcomments = async (request, response, next) => {
  try {
    const comments = await Comment.find({ postId: request.params.postId }).sort(
      { createdAt: -1 }
    );
    response.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (request, response, next) => {
  try {
    const comment = await Comment.findById(request.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    const userIndex = comment.likes.indexOf(request.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(request.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    response.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const editComment = async (request, response, next) => {
  try {
    const comment = await Comment.findById(request.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== request.user.id && !request.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      request.params.commentId,
      {
        content: request.body.content,
      },
      { new: true }
    );
    response.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (request, response, next) => {
  try {
    const comment = await Comment.findById(request.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== request.user.id && !request.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to delete this comment")
      );
    }
    await Comment.findByIdAndDelete(request.params.commentId);
    response.status(200).json("Comment has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getcomments = async (request, response, next) => {
  if (!request.user.isAdmin)
    return next(errorHandler(403, "You are not allowed to get all comments"));
  try {
    const startIndex = parseInt(request.query.startIndex) || 0;
    const limit = parseInt(request.query.limit) || 9;
    const sortDirection = request.query.sort === "desc" ? -1 : 1;
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    response.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};
