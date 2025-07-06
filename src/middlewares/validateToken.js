import jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";

export const authRequired = (req, res, next) => {
  const tokenFromCookie = req.cookies?.token;
  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;
    console.log("Token from cookie:", tokenFromCookie);
    console.log("Token from header:", tokenFromHeader);
  const token = tokenFromCookie || tokenFromHeader;

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};
