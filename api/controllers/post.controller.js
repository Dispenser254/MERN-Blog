import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (request, response, next) => {
  if (!request.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!request.body.title || !request.body.content) {
    return next(errorHandler(400, "Provide all required fields"));
  }

  const slug = request.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "");
  const newPost = new Post({
    ...request.body,
    slug,
    userId: request.user.id,
  });
  try {
    const savedPost = await newPost.save();
    response.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletepost = async (request, response, next) => {
  if (!request.user.isAdmin || request.user.id !== request.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  try {
    await Post.findByIdAndDelete(request.params.postId);
    response.status(200).json("Thepost has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updatepost = async (request, response, next) => {
  if (!request.user.isAdmin || request.user.id !== request.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this post"));
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      request.params.postId,
      {
        $set: {
          title: request.body.title,
          content: request.body.content,
          category: request.body.category,
          image: request.body.image,
        },
      },
      { new: true }
    );
    response.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
