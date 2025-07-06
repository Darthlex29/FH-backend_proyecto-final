import { User } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/cypto.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";

// Función que envuelve el callback en una Promesa
function generateToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        console.log("Error generating token:", err);
        return reject(err);
      }
      console.log("Token generated successfully:", token);
      resolve(token);
    });
  });
}

export async function createUserService({ username, email, password }) {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = await generateToken({ id: user.id });
  return {
    user,
    token,
  };
}

export async function loginUserService({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) throw new Error("Invalid credentials");

  const token = await generateToken({ id: user.id });
  return {
    user,
    token,
  };
}

export async function logoutService(res) {
  res.cookie("token", "", { expires: new Date(0) });
  return { message: "Logged out successfully" };
}
