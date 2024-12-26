import express from "express"; 
import authMiddleware from "../middlewares/authMiddleware.js";
import {  getRecipes, searchRecipes, filterByMealTypeOrDietaryPreference, sortByCalories } from "../controllers/receipeController.js";

const router = express.Router()

router.use(authMiddleware)
router.get('/', getRecipes);
router.get('/search',searchRecipes)
router.get('/filter', filterByMealTypeOrDietaryPreference)
router.get('/sortBy',sortByCalories)

export default router