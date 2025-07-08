import {
  createUserService,
  loginUserService,
  logoutService,
} from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";
import { getUserByIdService} from "../services/user.service.js";

export async function register(req, res) {
  try {
    const user = await createUserService(req.body);
    console.log("Token generated successfully controller:", user.token);
    res.cookie("token", user.token, {
      sameSite: "none",
      secure: true,
      httpOnly: false
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error in createUser:", err.message);
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const result = await loginUserService(req.body);
    res.cookie("token", result.token, {
      sameSite: "none",
      secure: true,
      httpOnly: false
    });
    res.status(200).json({
      message: "Login successful",
      user: {
        id: result.user.id,
        username: result.user.username,
        email: result.user.email,
      },
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

export async function logout(req, res) {
  try {
    const result = await logoutService(res);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function profile(req, res) {
  try {
    res.json({ message: "User profile" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const verifyToken = async (req, res) => {
  const {token}= req.cookies
  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }
  jwt.verify(token, SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userFound = await getUserByIdService(decoded.id);
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ userId: decoded.id, message: "Token is valid" });
  });
}