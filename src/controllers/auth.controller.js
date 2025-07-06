import {
  createUserService,
  loginUserService,
  logoutService,
} from "../services/auth.service.js";

export async function register(req, res) {
  try {
    const user = await createUserService(req.body);
    console.log("Token generated successfully controller:", user.token);
    res.cookie("token", user.token);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error in createUser:", err.message);
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const result = await loginUserService(req.body);
    res.cookie("token", result.token);
    res.status(200).json({
      message: "Login successful",
      user: {
        id: result.user.id,
        username: result.user.username,
        email: result.user.email,
      },
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

export async function logout(req, res) {
  try {
    const result = await logoutService(res);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function profile(req, res) {
  try {
    // Aquí podrías obtener el perfil del usuario desde la base de datos
    // usando req.user.id si estás usando un middleware de autenticación.
    res.json({ message: "User profile" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
