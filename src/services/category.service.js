import { Category } from "../models/category.model.js";

// Crear una categoría
export async function createCategoryService({ name }) {
  const existing = await Category.findOne({ where: { name } });
  if (existing) throw new Error("Category already exists");

  return await Category.create({ name });
}

// Obtener todas las categorías
export async function getAllCategoriesService() {
  return await Category.findAll();
}

// Obtener una categoría por ID
export async function getCategoryByIdService(id) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error("Category not found");
  return category;
}

// Actualizar una categoría
export async function updateCategoryService(id, { name }) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error("Category not found");

  await category.update({ name });
  return category;
}

// Eliminar una categoría
export async function deleteCategoryService(id) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error("Category not found");

  await category.destroy();
  return;
}
