import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const adminRouter = express.Router();

// Admin-only route
adminRouter.get("/admin/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome Admin! This is your dashboard." });
});

export default adminRouter;
