import { User } from "../models/user.model.js";
import { hashPassword } from "../utils/cypto.js";

export async function createUserService({ username, email, password }) {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error("User already exists");

  const user = await User.create({
    username,
    email,
    password,
  });

  return user;
}

export async function getAllUsersService() {
  return await User.findAll();
}

export async function getUserByIdService(id) {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");
  return user;
}

export async function updateUserService(id, { username, email, password }) {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  const updatedData = {
    username,
    email,
    password: password ? await hashPassword(password) : user.password,
  };

  await user.update(updatedData);
  return user;
}

export async function deleteUserService(id) {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");
  await user.destroy();
  return;
}