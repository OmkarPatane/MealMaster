import express from "express";
import CalendarModel from "../models/CalendarModel.js";
import authMiddleware from "../middleware/authMiddleware.js";

const calendarRoutes = express.Router();

// ✅ Add Meal to Calendar (POST)
calendarRoutes.post("/add", authMiddleware, async (req, res) => {
  try {
    const newMeal = new CalendarModel({ ...req.body, userId: req.user.id });
    await newMeal.save();
    res.status(201).json({ success: true, message: "Meal added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Get User's Meals (GET)
calendarRoutes.get("/", authMiddleware, async (req, res) => {
  try {
    const meals = await CalendarModel.find({ userId: req.user.id });
    res.json(meals);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


calendarRoutes.get("/userRecipe/:_id", async (req, res) => {
  try {
    // const {id}= req.params
    const meals = await CalendarModel.find({ userId:req.params._id });
    res.json(meals);
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
});




// ✅ Delete Meal from Calendar (DELETE)
calendarRoutes.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await CalendarModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Meal removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default calendarRoutes;
