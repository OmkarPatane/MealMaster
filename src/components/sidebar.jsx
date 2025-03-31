import { useEffect, useState } from "react";
import "../styles/sidebar.css";
import axios from "axios";

// const sampleMeals = [
//   {
//     name: "Paneer Tikka",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Paneer%20Tikka.jpeg",
//     mealType: "Dinner",
//     ingredients: ["Paneer", "Yogurt", "Spices", "Capsicum", "Onions"],
//     calories: 320,
//     dietaryPreference: ["Vegetarian", "Gluten-Free"],
//     recipe:
//       "Marinate paneer cubes with yogurt, spices, and chopped vegetables. Grill until lightly charred and serve hot.",
//   },
//   {
//     name: "Chicken Biryani",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Chicken%20Biryani.jpeg",
//     mealType: "Lunch",
//     ingredients: ["Chicken", "Basmati Rice", "Spices", "Yogurt", "Onions"],
//     calories: 580,
//     dietaryPreference: ["Non-Vegetarian"],
//     recipe:
//       "Cook spiced chicken and parboiled rice separately, then layer them together with fried onions and saffron. Steam until fully cooked.",
//   },
//   {
//     name: "Aloo Paratha",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Aloo%20Paratha.jpeg",
//     mealType: "Breakfast",
//     ingredients: ["Potatoes", "Whole Wheat Flour", "Spices", "Butter"],
//     calories: 280,
//     dietaryPreference: ["Vegetarian"],
//     recipe:
//       "Prepare a spiced mashed potato filling, stuff it into rolled-out dough, and cook on a hot griddle with butter.",
//   },
//   {
//     name: "Egg Curry",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Egg%20Curry.jpeg",
//     mealType: "Dinner",
//     ingredients: ["Eggs", "Tomatoes", "Onions", "Spices", "Coconut Milk"],
//     calories: 450,
//     dietaryPreference: ["Non-Vegetarian", "Gluten-Free"],
//     recipe:
//       "Boil eggs, then simmer in a spiced tomato and coconut milk gravy. Serve with rice or bread.",
//   },
//   {
//     name: "Veg Salad",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Veg%20Salad.jpeg",
//     mealType: "Snack",
//     ingredients: ["Lettuce", "Cucumber", "Tomatoes", "Carrots", "Lemon"],
//     calories: 150,
//     dietaryPreference: ["Vegetarian", "Vegan", "Gluten-Free"],
//     recipe:
//       "Chop all vegetables, toss them together, and drizzle with lemon juice before serving.",
//   },
//   {
//     name: "Palak Paneer",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Palak%20Paneer.jpeg",
//     mealType: "Lunch",
//     ingredients: ["Spinach", "Paneer", "Garlic", "Spices", "Cream"],
//     calories: 340,
//     dietaryPreference: ["Vegetarian", "Gluten-Free"],
//     recipe:
//       "Cook spinach with garlic and spices, blend into a puree, and simmer with paneer cubes and cream.",
//   },
//   {
//     name: "Fish Curry",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Fish%20Curry.jpeg",
//     mealType: "Dinner",
//     ingredients: ["Fish", "Coconut Milk", "Tomatoes", "Spices"],
//     calories: 430,
//     dietaryPreference: ["Non-Vegetarian", "Gluten-Free"],
//     recipe:
//       "Cook fish in a spiced tomato and coconut milk gravy until tender. Serve with rice.",
//   },
//   {
//     name: "Pasta Alfredo",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Pasta%20Alfredo.jpeg",
//     mealType: "Lunch",
//     ingredients: ["Pasta", "Cream", "Garlic", "Parmesan Cheese"],
//     calories: 600,
//     dietaryPreference: ["Vegetarian"],
//     recipe:
//       "Cook pasta and toss it in a creamy Alfredo sauce made with garlic, cream, and Parmesan cheese.",
//   },
//   {
//     name: "Masala Dosa",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Masala%20Dosa.jpeg",
//     mealType: "Breakfast",
//     ingredients: ["Rice Batter", "Potatoes", "Onions", "Spices"],
//     calories: 300,
//     dietaryPreference: ["Vegetarian", "Gluten-Free"],
//     recipe:
//       "Prepare a spiced potato filling, spread it inside a crispy dosa made from fermented rice batter.",
//   },
//   {
//     name: "Chole Bhature",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Chole%20Bhature.jpeg",
//     mealType: "Lunch",
//     ingredients: ["Chickpeas", "Spices", "Flour", "Yogurt"],
//     calories: 450,
//     dietaryPreference: ["Vegetarian"],
//     recipe:
//       "Cook chickpeas in a spiced tomato gravy and serve with deep-fried fluffy bread (bhature).",
//   },
//   {
//     name: "Paneer Butter Masala",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Paneer%20Butter%20Masala.jpeg",
//     mealType: "Dinner",
//     ingredients: ["Paneer", "Tomatoes", "Butter", "Cream", "Spices"],
//     calories: 370,
//     dietaryPreference: ["Vegetarian", "Gluten-Free"],
//     recipe:
//       "Cook paneer in a rich tomato-based gravy with butter and cream. Serve with naan or rice.",
//   },
//   {
//     name: "Chicken Tikka",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Chicken%20Tikka.jpeg",
//     mealType: "Snack",
//     ingredients: ["Chicken", "Yogurt", "Spices", "Lemon"],
//     calories: 270,
//     dietaryPreference: ["Non-Vegetarian", "Gluten-Free"],
//     recipe:
//       "Marinate chicken with yogurt and spices, grill until cooked, and serve with lemon wedges.",
//   },
//   {
//     name: "Vegetable Pulao",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Vegetable%20Pulao.jpeg",
//     mealType: "Lunch",
//     ingredients: ["Basmati Rice", "Vegetables", "Spices", "Ghee"],
//     calories: 310,
//     dietaryPreference: ["Vegetarian", "Gluten-Free"],
//     recipe:
//       "Cook basmati rice with mixed vegetables, spices, and ghee for a flavorful pulao.",
//   },
//   {
//     name: "Rajma Chawal",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Rajma%20Chawal.jpeg",
//     mealType: "Lunch",
//     ingredients: ["Kidney Beans", "Rice", "Tomatoes", "Spices"],
//     calories: 400,
//     dietaryPreference: ["Vegetarian", "Gluten-Free"],
//     recipe:
//       "Simmer kidney beans in a spiced tomato gravy and serve with steamed rice.",
//   },
//   {
//     name: "Shrimp Stir-Fry",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Shrimp%20Stir-Fry.jpeg",
//     mealType: "Dinner",
//     ingredients: ["Shrimp", "Bell Peppers", "Soy Sauce", "Garlic"],
//     calories: 350,
//     dietaryPreference: ["Non-Vegetarian", "Gluten-Free"],
//     recipe:
//       "Stir-fry shrimp with bell peppers, soy sauce, and garlic for a quick and flavorful meal.",
//   },
//   {
//     name: "Fruit Salad",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Fruit%20Salad.jpeg",
//     mealType: "Snack",
//     ingredients: ["Apples", "Bananas", "Grapes", "Oranges"],
//     calories: 120,
//     dietaryPreference: ["Vegetarian", "Vegan", "Gluten-Free"],
//     recipe: "Chop fresh fruits and mix them together for a refreshing snack.",
//   },
//   {
//     name: "Dal Tadka",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Dal%20Tadka.jpeg",
//     mealType: "Dinner",
//     ingredients: ["Lentils", "Garlic", "Ghee", "Spices"],
//     calories: 250,
//     dietaryPreference: ["Vegetarian", "Gluten-Free"],
//     recipe:
//       "Cook lentils and temper them with garlic, ghee, and spices for a hearty dish.",
//   },
//   {
//     name: "Grilled Chicken",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Grilled%20Chicken.jpeg",
//     mealType: "Dinner",
//     ingredients: ["Chicken", "Lemon", "Garlic", "Olive Oil"],
//     calories: 400,
//     dietaryPreference: ["Non-Vegetarian", "Gluten-Free"],
//     recipe:
//       "Marinate chicken with lemon, garlic, and olive oil. Grill until cooked.",
//   },
//   {
//     name: "Idli Sambhar",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Idli%20Sambhar.jpeg",
//     mealType: "Breakfast",
//     ingredients: ["Rice Batter", "Lentils", "Vegetables", "Spices"],
//     calories: 200,
//     dietaryPreference: ["Vegetarian", "Gluten-Free"],
//     recipe:
//       "Steam fermented rice batter to make idlis and serve with a spiced lentil soup (sambhar).",
//   },
//   {
//     name: "Chicken Sandwich",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Chicken%20Sandwich.jpeg",
//     mealType: "Snack",
//     ingredients: ["Chicken", "Bread", "Lettuce", "Mayonnaise"],
//     calories: 350,
//     dietaryPreference: ["Non-Vegetarian"],
//     recipe:
//       "Layer cooked chicken, lettuce, and mayonnaise between slices of bread. Serve fresh.",
//   },
//   {
//     name: "Mushroom Soup",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Mushroom%20Soup.jpeg",
//     mealType: "Starter",
//     ingredients: ["Mushrooms", "Cream", "Garlic", "Onions"],
//     calories: 180,
//     dietaryPreference: ["Vegetarian"],
//     recipe:
//       "Cook mushrooms, garlic, and onions in cream until tender. Blend and serve warm.",
//   },
//   {
//     name: "Quinoa Salad",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Quinoa%20Salad.jpeg",
//     mealType: "Lunch",
//     ingredients: ["Quinoa", "Tomatoes", "Cucumber", "Olive Oil", "Lemon"],
//     calories: 200,
//     dietaryPreference: ["Vegetarian", "Vegan", "Gluten-Free"],
//     recipe:
//       "Cook quinoa, chop vegetables, and toss together with olive oil and lemon juice.",
//   },
//   {
//     name: "Samosa",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Samosa.jpeg",
//     mealType: "Snack",
//     ingredients: ["Potatoes", "Flour", "Spices", "Peas"],
//     calories: 250,
//     dietaryPreference: ["Vegetarian"],
//     recipe:
//       "Prepare a spiced potato filling, wrap it in dough, and deep fry until crispy.",
//   },
//   {
//     name: "Pav Bhaji",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Pav%20Bhaji.jpeg",
//     mealType: "Snack",
//     ingredients: ["Vegetables", "Pav Bread", "Butter", "Spices"],
//     calories: 450,
//     dietaryPreference: ["Vegetarian"],
//     recipe:
//       "Cook mashed vegetables with spices, serve with buttered pav bread.",
//   },
//   {
//     name: "Butter Chicken",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Butter%20Chicken.jpeg",
//     mealType: "Dinner",
//     ingredients: ["Chicken", "Butter", "Tomatoes", "Cream"],
//     calories: 500,
//     dietaryPreference: ["Non-Vegetarian", "Gluten-Free"],
//     recipe:
//       "Cook chicken in a creamy tomato-based gravy with butter. Serve with naan or rice.",
//   },
//   {
//     name: "Vegetable Soup",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Vegetable%20Soup.jpeg",
//     mealType: "Starter",
//     ingredients: ["Carrots", "Beans", "Onions", "Garlic"],
//     calories: 100,
//     dietaryPreference: ["Vegetarian", "Vegan", "Gluten-Free"],
//     recipe: "Cook mixed vegetables in a spiced broth until tender. Serve warm.",
//   },
//   {
//     name: "Paneer Bhurji",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Paneer%20Bhurji.jpeg",
//     mealType: "Dinner",
//     ingredients: ["Paneer", "Tomatoes", "Onions", "Spices"],
//     calories: 320,
//     dietaryPreference: ["Vegetarian", "Gluten-Free"],
//     recipe: "Scramble paneer with spiced tomatoes and onions for a quick dish.",
//   },
//   {
//     name: "Mutton Curry",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Mutton%20Curry.jpeg",
//     mealType: "Dinner",
//     ingredients: ["Mutton", "Tomatoes", "Onions", "Spices"],
//     calories: 600,
//     dietaryPreference: ["Non-Vegetarian", "Gluten-Free"],
//     recipe: "Cook mutton in a spiced tomato and onion gravy until tender.",
//   },
//   {
//     name: "Mixed Fruit Smoothie",
//     img: "https://ik.imagekit.io/m9qnay09g/meal%20planner%20dish%20images/Mixed%20Fruit%20Smoothie.jpeg",
//     mealType: "Breakfast",
//     ingredients: ["Banana", "Berries", "Milk", "Yogurt"],
//     calories: 180,
//     dietaryPreference: ["Vegetarian"],
//     recipe: "Blend banana, berries, milk, and yogurt for a creamy smoothie.",
//   },
// ];




export const Sidebar = () => {
  const [toggle, setToggle] = useState(true);
  const [filter, setFilter] = useState("All My Recipe");
  const [sampleMeals,setMeals] = useState([])
  const [mealTypeFilter, setMealTypeFilter] = useState("All");
  const [caloriesFilter, setCaloriesFilter] = useState([0, 1000]);

  useEffect(()=>{
    fetchRecipe()
  },[])


  async function fetchRecipe (){
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "https://meal-planner-backend-0rkj.onrender.com/recipe/",
        {
          headers: { token },
        }
      );
      // console.log(token)
      console.log(response.data)
      setMeals(response.data)
    } catch (error) {
      console.log("Error getting recipes",error)
    }
  }


  const clickHandle = () => {
    setToggle(!toggle);
  };

  const handleDragStart = (e, meal) => {
    const data = JSON.stringify({
      name: meal.name,
      img: meal.img,
      calories: meal.calories,
      mealType: meal.mealType,
      date: "",
      recipe: meal.recipe,
      ingredients:meal.ingredients
    });
    e.dataTransfer.setData("text/plain", data);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleMealTypeChange = (e) => {
    setMealTypeFilter(e.target.value);
  };

  const handleCaloriesChange = (e) => {
    const value = e.target.value.split("-");
    setCaloriesFilter([parseInt(value[0]), parseInt(value[1])]);
  };

  const filteredMeals = sampleMeals.filter((meal) => {
    const dietaryMatch =
      filter === "All My Recipe" ||
      (filter === "VEGETARIAN" &&
        meal.dietaryPreference?.includes("Vegetarian")) ||
      (filter === "NON-VEGETARIAN" &&
        meal.dietaryPreference?.includes("Non-Vegetarian"));

    const mealTypeMatch =
      mealTypeFilter === "All" || meal.mealType === mealTypeFilter;

    const caloriesMatch =
      meal.calories >= caloriesFilter[0] && meal.calories <= caloriesFilter[1];

    return dietaryMatch && mealTypeMatch && caloriesMatch;
  });

  return (
    <div className={`sidebar ${toggle ? "" : "collapsed"}`}>
      <button onClick={clickHandle} className="toggle-btn">
        {toggle ? "<" : ">"}
      </button>
      <div style={{ display: toggle ? "block" : "none" }} className="search">
        <select
          className="recipe_search"
          onChange={handleFilterChange}
          value={filter}
        >
          <option>All My Recipe</option>
          <option>VEGETARIAN</option>
          <option>NON-VEGETARIAN</option>
        </select>
        <select
          className="meal_type_filter"
          onChange={handleMealTypeChange}
          value={mealTypeFilter}
        >
          <option value="All">All Meal Types</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="Starter">Starter</option>
        </select>
        <select
          className="calories_filter"
          onChange={handleCaloriesChange}
          value={caloriesFilter.join("-")}
        >
          <option value="0-1000">All Calories</option>
          <option value="0-300">0 - 300</option>
          <option value="300-600">300 - 600</option>
          <option value="600-1000">600 - 1000</option>
        </select>
      </div>
      <div style={{ display: toggle ? "block" : "none" }} className="show-data">
        {filteredMeals.map((meal, index) => (
          <div
            key={index}
            className="box"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, meal)}
          >
            <img src={meal.img} alt={meal.name} className="meal-image" />
            <div style={{ display: "flex", gap: "10px" }}>
              <p className="meal-name">{meal.name}</p>
              <p
                style={{ display: toggle ? "none" : "" }}
                className="meal-calories"
              >
                {meal.calories} Calories
              </p>
              <p
                className="meal-type"
                style={{ display: toggle ? "none" : "" }}
              >
                {meal.mealType}
              </p>
              <p
                className="meal-recipe"
                style={{ display: toggle ? "none" : "" }}
              >
                {meal.recipe}
              </p>
              <p
                className="meal-ingredients"
                style={{ display: toggle ? "none" : "" }}
              >
                {meal.ingredients}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
