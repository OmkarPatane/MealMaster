import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  mealType: { type: String, required: true },
  ingredients: { type: [String], required: true }, // Array of ingredients
  calories: { type: Number, required: true },
  dietaryPreference: { type: [String], required: true }, // Array for multiple dietary preferences
  recipe: { type: String, required: true },
});

export const Recipe = mongoose.model("Recipe", recipeSchema);
