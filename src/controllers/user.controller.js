import {
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  createUserService,
} from "../services/user.service.js";

export async function createUser(req, res) {
  try {
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error("Error in createUser:", err.message);
    res.status(400).json({ error: err.message });
  }
}

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const user = await updateUserService(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    await deleteUserService(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
