import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "../api/routes/user.route.js";
import authRoutes from "../api/routes/auth.route.js";
import cookieParser from "cookie-parser";
import postRoutes from "../api/routes/post.route.js";
import commentRoutes from "../api/routes/comment.route.js";
import path from "path";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((e) => {
    console.log(e);
  });

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  response.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
