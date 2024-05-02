import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (request, response) => {
  const { username, email, password } = request.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return response.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    response.json("Signup successfull");
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};
