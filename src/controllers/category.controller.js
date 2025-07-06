import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/category.service.js";

// Crear
export async function createCategory(req, res) {
  try {
    const category = await createCategoryService(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Obtener todas
export async function getCategories(req, res) {
  try {
    const categories = await getAllCategoriesService();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Obtener una
export async function getCategoryById(req, res) {
  try {
    const category = await getCategoryByIdService(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// Actualizar
export async function updateCategory(req, res) {
  try {
    const category = await updateCategoryService(req.params.id, req.body);
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Eliminar
export async function deleteCategory(req, res) {
  try {
    await deleteCategoryService(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
