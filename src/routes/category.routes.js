import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/", authRequired, createCategory);
router.get("/", getCategories);
router.get("/:id", authRequired, getCategoryById);
router.put("/:id", authRequired, updateCategory);
router.delete("/:id", authRequired, deleteCategory);

export default router;
          