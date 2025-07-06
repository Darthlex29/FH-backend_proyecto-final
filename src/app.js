import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import noteRoutes from './routes/notes.routes.js';
import categoryRoutes from './routes/category.routes.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/categories", categoryRoutes);


export default app;
