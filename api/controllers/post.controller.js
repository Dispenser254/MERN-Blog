import Post from "../models/post.model";
import { errorHandler } from "../utils/error";

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

export const getposts = async (request, response, next) => {
  try {
    const startIndex = parseInt(request.query.startIndex) || 0;
    const limit = parseInt(request.query.limit) || 9;
    const sortDirection = request.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(request.query.userId && { userId: request.query.userId }),
      ...(request.query.category && { category: request.query.category }),
      ...(request.query.slug && { slug: request.query.slug }),
      ...(request.query.postId && { _id: request.query.postId }),
      ...(request.query.searchTerm && {
        $or: [
          { title: { $regex: request.query.searchTerm, $options: "i" } },
          { content: { $regex: request.query.searchTerm, $options: "i" } },
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

    const lastMonthsPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    response.status(200).json(posts, totalPosts, lastMonthsPosts);
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
