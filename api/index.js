import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "../api/routes/user.route.js"

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', userRoutes)