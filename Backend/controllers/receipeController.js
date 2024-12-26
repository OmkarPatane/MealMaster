import Recipe from "../models/receipeModel.js";

const getRecipes = async (req, res) => {
  try {
  
    const recipes = await Recipe.find()
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipes", error });
  }
};

//seachReciepes
const searchRecipes = async (req, res) => {
  try {
    const { name } = req.query;
    const q = {};

    if (name) {
      q.name = new RegExp(name, "i");
    }

    const recipes = await Recipe.find(q)
      .select("name img mealType calories");
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipes", error });
  }
};

//filterByMealType OR DietryPreference
const filterByMealTypeOrDietaryPreference = async (req, res) => {
  try {
    const { mealType, dietaryPreference} = req.query;

    let filter = {};

    if (dietaryPreference) {
      filter.dietaryPreference = { $in: dietaryPreference };
    }
    if (mealType) {
      filter.mealType = mealType;
    }
    const recipes = await Recipe.find(filter)
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipes", error });
  }
};

//sort by calories
const sortByCalories = async (req, res) => {
  try {
    const {
      sortField = "calories",
      sortOrder = "asc"
    } = req.query;

    const recipes = await Recipe.find()
      .sort({ [sortField]: sortOrder === "asc" ? 1 : -1 })

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipes", error });
  }
};

export {
  getRecipes,
  searchRecipes,
  filterByMealTypeOrDietaryPreference,
  sortByCalories,
};
