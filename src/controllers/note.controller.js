import {
  createNoteService,
  getAllNotesService,
  getNoteByIdService,
  updateNoteService,
  deleteNoteService,
} from "../services/note.service.js";

// Crear nota
export async function createNote(req, res) {
  try {
    const note = await createNoteService(req.body);
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtener todas las notas
export async function getNotes(req, res) {
  try {
    const notes = await getAllNotesService();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener una nota por ID
export async function getNoteById(req, res) {
  try {
    const note = await getNoteByIdService(req.params.id);
    res.json(note);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// Actualizar nota
export async function updateNote(req, res) {
  try {
    const note = await updateNoteService(req.params.id, req.body);
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Eliminar nota
export async function deleteNote(req, res) {
  try {
    await deleteNoteService(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
