import { Schema, model } from "mongoose";

const receipeSchema = new Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    mealType: { type: String, required: true },
    ingredients: { type: [String], required: true },
    calories: { type: Number, required: true },
    dietaryPreference: { type: [String], required: true },
    recipe:{type:String}
  },
  { timestamps: true }
);

const Recipe = model("recipe", receipeSchema);
export default Recipe;
