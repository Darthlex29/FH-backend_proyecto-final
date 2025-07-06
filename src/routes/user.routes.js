import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", authRequired, getUserById);
router.post("/", authRequired, createUser);
router.put("/:id", authRequired, updateUser);
router.delete("/:id", authRequired, deleteUser);

export default router;