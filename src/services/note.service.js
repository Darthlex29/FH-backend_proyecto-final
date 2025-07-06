import { Note } from "../models/note.model.js";
import { Category } from "../models/category.model.js";
import { Op } from "sequelize";

// Crear una nota
/*
export async function createNoteService({ title, content, isArchived = false }) {
  return await Note.create({ title, content, isArchived });
}
*/

export async function createNoteService({
  title,
  content,
  isArchived = false,
  userId,
  categories = [],
}) {
  // 1. Crear la nota
  const note = await Note.create({
    title,
    content,
    isArchived,
    userId,
  });

  // 2. Asociar categorías (por nombre)
  if (categories.length > 0) {
    const foundCategories = await Category.findAll({
      where: {
        name: categories,
      },
    });

    await note.addCategories(foundCategories);
  }

  return note;
}

// Obtener todas las notas
export async function getAllNotesService() {
  return await Note.findAll();
}

// Obtener una nota por ID
export async function getNoteByIdService(id) {
  const note = await Note.findByPk(id);
  if (!note) throw new Error("Note not found");
  return note;
}

// Actualizar una nota
export async function updateNoteService(id, { title, content, isArchived }) {
  const note = await Note.findByPk(id);
  if (!note) throw new Error("Note not found");

  await note.update({ title, content, isArchived });
  return note;
}

// Eliminar una nota
export async function deleteNoteService(id) {
  const note = await Note.findByPk(id);
  if (!note) throw new Error("Note not found");

  await note.destroy();
  return;
}

// Obtener notas filtradas

export async function getFilteredNotesService({
  userId,
  categoryNames = [],
  title = null,
  isArchived = null,
}) {
  const where = { userId };

  // Filtro opcional por título
  if (title !== null) {
    where.title = { [Op.iLike]: `%${title}%` }; // PostgreSQL: insensible a mayúsculas
  }

  // Filtro opcional por estado archivado
  if (isArchived !== null) {
    where.isArchived = isArchived;
  }

  const include = [];

  // Si se especifican categorías, incluir relación
  if (categoryNames.length > 0) {
    include.push({
      model: Category,
      where: {
        name: {
          [Op.in]: categoryNames,
        },
      },
      through: { attributes: [] }, // Oculta datos de la tabla intermedia
    });
  }

  const notes = await Note.findAll({
    where,
    include,
  });

  return notes;
}
