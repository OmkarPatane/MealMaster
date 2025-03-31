import express from "express";
import { Recipe } from "../models/recipe.js";



const recipeRoutes = express.Router();

// Add a new recipe
recipeRoutes.post("/add", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json({ message: "Recipe added successfully", newRecipe });
  } catch (error) {
    res.status(500).json({ message: "Error adding recipe", error });
  }
});

// Get all recipes
recipeRoutes.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
});

export default recipeRoutes;
