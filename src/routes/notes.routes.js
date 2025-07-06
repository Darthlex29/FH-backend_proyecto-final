import { Router } from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  getFilteredNotes,
} from "../controllers/note.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/", authRequired, createNote);
router.get("/", getNotes);
router.get("/:id", authRequired, getNoteById);
router.put("/:id", authRequired, updateNote);
router.delete("/:id", authRequired, deleteNote);
router.get("/user/all", authRequired, getFilteredNotes);


export default router;
