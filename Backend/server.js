import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminRoutes from "./routes/admin.js";

import authRoutes from "./routes/auth.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import { connectDB } from "./config/db.js";
import authMiddleware from "./middleware/authMiddleware.js";
import calendarRoutes from "./routes/calendarRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/", authRoutes);
app.use("/", adminRoutes);
app.use("/recipe",authMiddleware, recipeRoutes);
app.use("/calendar", calendarRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
