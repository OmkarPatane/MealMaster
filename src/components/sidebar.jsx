import { useState } from "react";
import "../styles/sidebar.css";

const sampleMeals = [
  {
    name: "Paneer Tikka",
    img: "https://ik.imagekit.io/cyber/Palak%20Paneer.png?updatedAt=1734675966680",
    mealType: "Dinner",
    ingredients: ["Paneer", "Yogurt", "Spices", "Capsicum", "Onions"],
    calories: 320,
    dietaryPreference: ["Vegetarian", "Gluten-Free"],
    recipe:
      "Marinate paneer cubes with yogurt, spices, and chopped vegetables. Grill until lightly charred and serve hot.",
  },
  {
    name: "Chicken Biryani",
    img: "https://ik.imagekit.io/cyber/Chicken%20Biryani.png?updatedAt=1734675966476",
    mealType: "Lunch",
    ingredients: ["Chicken", "Basmati Rice", "Spices", "Yogurt", "Onions"],
    calories: 580,
    dietaryPreference: ["Non-Vegetarian"],
    recipe:
      "Cook spiced chicken and parboiled rice separately, then layer them together with fried onions and saffron. Steam until fully cooked.",
  },
  {
    name: "Aloo Paratha",
    img: "https://ik.imagekit.io/cyber/Aloo%20Paratha.png?updatedAt=1734675966349",
    mealType: "Breakfast",
    ingredients: ["Potatoes", "Whole Wheat Flour", "Spices", "Butter"],
    calories: 280,
    dietaryPreference: ["Vegetarian"],
    recipe:
      "Prepare a spiced mashed potato filling, stuff it into rolled-out dough, and cook on a hot griddle with butter.",
  },
  {
    name: "Egg Curry",
    img: "https://ik.imagekit.io/cyber/Egg%20Curry.png?updatedAt=1734675966312",
    mealType: "Dinner",
    ingredients: ["Eggs", "Tomatoes", "Onions", "Spices", "Coconut Milk"],
    calories: 450,
    dietaryPreference: ["Non-Vegetarian", "Gluten-Free"],
    recipe:
      "Boil eggs, then simmer in a spiced tomato and coconut milk gravy. Serve with rice or bread.",
  },
  {
    name: "Veg Salad",
    img: "https://ik.imagekit.io/cyber/Veg%20Salad.png?updatedAt=1734675966172",
    mealType: "Snack",
    ingredients: ["Lettuce", "Cucumber", "Tomatoes", "Carrots", "Lemon"],
    calories: 150,
    dietaryPreference: ["Vegetarian", "Vegan", "Gluten-Free"],
    recipe:
      "Chop all vegetables, toss them together, and drizzle with lemon juice before serving.",
  },
  {
    name: "Palak Paneer",
    img: "https://ik.imagekit.io/cyber/Palak%20Paneer.png?updatedAt=1734675966680",
    mealType: "Lunch",
    ingredients: ["Spinach", "Paneer", "Garlic", "Spices", "Cream"],
    calories: 340,
    dietaryPreference: ["Vegetarian", "Gluten-Free"],
    recipe:
      "Cook spinach with garlic and spices, blend into a puree, and simmer with paneer cubes and cream.",
  },
  {
    name: "Fish Curry",
    img: "https://ik.imagekit.io/cyber/Fish%20Curry.png?updatedAt=1734675965795",
    mealType: "Dinner",
    ingredients: ["Fish", "Coconut Milk", "Tomatoes", "Spices"],
    calories: 430,
    dietaryPreference: ["Non-Vegetarian", "Gluten-Free"],
    recipe:
      "Cook fish in a spiced tomato and coconut milk gravy until tender. Serve with rice.",
  },
  {
    name: "Pasta Alfredo",
    img: "https://ik.imagekit.io/cyber/Pasta%20Alfredo.png?updatedAt=1734675965369",
    mealType: "Lunch",
    ingredients: ["Pasta", "Cream", "Garlic", "Parmesan Cheese"],
    calories: 600,
    dietaryPreference: ["Vegetarian"],
    recipe:
      "Cook pasta and toss it in a creamy Alfredo sauce made with garlic, cream, and Parmesan cheese.",
  },
  {
    name: "Masala Dosa",
    img: "https://ik.imagekit.io/cyber/Masala%20Dosa.png?updatedAt=1734675965016",
    mealType: "Breakfast",
    ingredients: ["Rice Batter", "Potatoes", "Onions", "Spices"],
    calories: 300,
    dietaryPreference: ["Vegetarian", "Gluten-Free"],
    recipe:
      "Prepare a spiced potato filling, spread it inside a crispy dosa made from fermented rice batter.",
  },
  {
    name: "Chole Bhature",
    img: "https://ik.imagekit.io/cyber/Chole%20Bhature.png?updatedAt=1734675963979",
    mealType: "Lunch",
    ingredients: ["Chickpeas", "Spices", "Flour", "Yogurt"],
    calories: 450,
    dietaryPreference: ["Vegetarian"],
    recipe:
      "Cook chickpeas in a spiced tomato gravy and serve with deep-fried fluffy bread (bhature).",
  },
  {
    name: "Paneer Butter Masala",
    img: "https://ik.imagekit.io/cyber/Paneer%20Butter%20Masala.png?updatedAt=1734675963808",
    mealType: "Dinner",
    ingredients: ["Paneer", "Tomatoes", "Butter", "Cream", "Spices"],
    calories: 370,
    dietaryPreference: ["Vegetarian", "Gluten-Free"],
    recipe:
      "Cook paneer in a rich tomato-based gravy with butter and cream. Serve with naan or rice.",
  },
  {
    name: "Chicken Tikka",
    img: "https://ik.imagekit.io/cyber/Chicken%20Tikka.png?updatedAt=1734675963935",
    mealType: "Snack",
    ingredients: ["Chicken", "Yogurt", "Spices", "Lemon"],
    calories: 270,
    dietaryPreference: ["Non-Vegetarian", "Gluten-Free"],
    recipe:
      "Marinate chicken with yogurt and spices, grill until cooked, and serve with lemon wedges.",
  },
  {
    name: "Vegetable Pulao",
    img: "https://ik.imagekit.io/cyber/Vegetable%20Pulao.png?updatedAt=1734675964166",
    mealType: "Lunch",
    ingredients: ["Basmati Rice", "Vegetables", "Spices", "Ghee"],
    calories: 310,
    dietaryPreference: ["Vegetarian", "Gluten-Free"],
    recipe:
      "Cook basmati rice with mixed vegetables, spices, and ghee for a flavorful pulao.",
  },
  {
    name: "Rajma Chawal",
    img: "https://ik.imagekit.io/cyber/Rajma%20Chawal.png?updatedAt=1734675964103",
    mealType: "Lunch",
    ingredients: ["Kidney Beans", "Rice", "Tomatoes", "Spices"],
    calories: 400,
    dietaryPreference: ["Vegetarian", "Gluten-Free"],
    recipe:
      "Simmer kidney beans in a spiced tomato gravy and serve with steamed rice.",
  },
  {
    name: "Shrimp Stir-Fry",
    img: "https://ik.imagekit.io/cyber/Shrimp%20Stir-Fry.png?updatedAt=1734675963645",
    mealType: "Dinner",
    ingredients: ["Shrimp", "Bell Peppers", "Soy Sauce", "Garlic"],
    calories: 350,
    dietaryPreference: ["Non-Vegetarian", "Gluten-Free"],
    recipe:
      "Stir-fry shrimp with bell peppers, soy sauce, and garlic for a quick and flavorful meal.",
  },
  {
    name: "Fruit Salad",
    img: "https://ik.imagekit.io/cyber/Fruit%20Salad.png?updatedAt=1734675963562",
    mealType: "Snack",
    ingredients: ["Apples", "Bananas", "Grapes", "Oranges"],
    calories: 120,
    dietaryPreference: ["Vegetarian", "Vegan", "Gluten-Free"],
    recipe: "Chop fresh fruits and mix them together for a refreshing snack.",
  },
  {
    name: "Dal Tadka",
    img: "https://ik.imagekit.io/cyber/Dal%20Tadka.png?updatedAt=1734675963395",
    mealType: "Dinner",
    ingredients: ["Lentils", "Garlic", "Ghee", "Spices"],
    calories: 250,
    dietaryPreference: ["Vegetarian", "Gluten-Free"],
    recipe:
      "Cook lentils and temper them with garlic, ghee, and spices for a hearty dish.",
  },
  {
    name: "Grilled Chicken",
    img: "https://ik.imagekit.io/cyber/Grilled%20Chicken.png?updatedAt=1734675962979",
    mealType: "Dinner",
    ingredients: ["Chicken", "Lemon", "Garlic", "Olive Oil"],
    calories: 400,
    dietaryPreference: ["Non-Vegetarian", "Gluten-Free"],
    recipe:
      "Marinate chicken with lemon, garlic, and olive oil. Grill until cooked.",
  },
  {
    name: "Idli Sambhar",
    img: "https://ik.imagekit.io/cyber/Idli%20Sambhar.png?updatedAt=1734675962557",
    mealType: "Breakfast",
    ingredients: ["Rice Batter", "Lentils", "Vegetables", "Spices"],
    calories: 200,
    dietaryPreference: ["Vegetarian", "Gluten-Free"],
    recipe:
      "Steam fermented rice batter to make idlis and serve with a spiced lentil soup (sambhar).",
  },
  {
    name: "Chicken Sandwich",
    img: "https://ik.imagekit.io/cyber/Chicken%20Sandwich.png?updatedAt=1734675960992",
    mealType: "Snack",
    ingredients: ["Chicken", "Bread", "Lettuce", "Mayonnaise"],
    calories: 350,
    dietaryPreference: ["Non-Vegetarian"],
    recipe:
      "Layer cooked chicken, lettuce, and mayonnaise between slices of bread. Serve fresh.",
  },
  {
    name: "Mushroom Soup",
    img: "https://ik.imagekit.io/cyber/Mushroom%20Soup.png?updatedAt=1734675960845",
    mealType: "Starter",
    ingredients: ["Mushrooms", "Cream", "Garlic", "Onions"],
    calories: 180,
    dietaryPreference: ["Vegetarian"],
    recipe:
      "Cook mushrooms, garlic, and onions in cream until tender. Blend and serve warm.",
  },
  {
    name: "Quinoa Salad",
    img: "https://ik.imagekit.io/cyber/Quinoa%20Salad.png?updatedAt=1734675960002",
    mealType: "Lunch",
    ingredients: ["Quinoa", "Tomatoes", "Cucumber", "Olive Oil", "Lemon"],
    calories: 200,
    dietaryPreference: ["Vegetarian", "Vegan", "Gluten-Free"],
    recipe:
      "Cook quinoa, chop vegetables, and toss together with olive oil and lemon juice.",
  },
  {
    name: "Samosa",
    img: "https://ik.imagekit.io/cyber/Samosa.png?updatedAt=1734675960500",
    mealType: "Snack",
    ingredients: ["Potatoes", "Flour", "Spices", "Peas"],
    calories: 250,
    dietaryPreference: ["Vegetarian"],
    recipe:
      "Prepare a spiced potato filling, wrap it in dough, and deep fry until crispy.",
  },
  {
    name: "Pav Bhaji",
    img: "https://ik.imagekit.io/cyber/Pav%20Bhaji.png?updatedAt=1734675959428",
    mealType: "Snack",
    ingredients: ["Vegetables", "Pav Bread", "Butter", "Spices"],
    calories: 450,
    dietaryPreference: ["Vegetarian"],
    recipe:
      "Cook mashed vegetables with spices, serve with buttered pav bread.",
  },
  {
    name: "Butter Chicken",
    img: "https://ik.imagekit.io/cyber/Butter%20Chicken.png?updatedAt=1734675960968",
    mealType: "Dinner",
    ingredients: ["Chicken", "Butter", "Tomatoes", "Cream"],
    calories: 500,
    dietaryPreference: ["Non-Vegetarian", "Gluten-Free"],
    recipe:
      "Cook chicken in a creamy tomato-based gravy with butter. Serve with naan or rice.",
  },
  {
    name: "Vegetable Soup",
    img: "https://ik.imagekit.io/cyber/Vegetable%20Soup.png?updatedAt=1734675961127",
    mealType: "Starter",
    ingredients: ["Carrots", "Beans", "Onions", "Garlic"],
    calories: 100,
    dietaryPreference: ["Vegetarian", "Vegan", "Gluten-Free"],
    recipe: "Cook mixed vegetables in a spiced broth until tender. Serve warm.",
  },
  {
    name: "Paneer Bhurji",
    img: "https://ik.imagekit.io/cyber/Paneer%20Bhurji.png?updatedAt=1734675961248",
    mealType: "Dinner",
    ingredients: ["Paneer", "Tomatoes", "Onions", "Spices"],
    calories: 320,
    dietaryPreference: ["Vegetarian", "Gluten-Free"],
    recipe: "Scramble paneer with spiced tomatoes and onions for a quick dish.",
  },
  {
    name: "Mutton Curry",
    img: "https://ik.imagekit.io/cyber/Mutton%20Curry.png?updatedAt=1734675961167",
    mealType: "Dinner",
    ingredients: ["Mutton", "Tomatoes", "Onions", "Spices"],
    calories: 600,
    dietaryPreference: ["Non-Vegetarian", "Gluten-Free"],
    recipe: "Cook mutton in a spiced tomato and onion gravy until tender.",
  },
  {
    name: "Mixed Fruit Smoothie",
    img: "https://ik.imagekit.io/cyber/Mixed%20Fruit%20Smoothie.png?updatedAt=1734675960862",
    mealType: "Breakfast",
    ingredients: ["Banana", "Berries", "Milk", "Yogurt"],
    calories: 180,
    dietaryPreference: ["Vegetarian"],
    recipe: "Blend banana, berries, milk, and yogurt for a creamy smoothie.",
  },
];

export const Sidebar = () => {
  const [toggle, setToggle] = useState(true);
  const [filter, setFilter] = useState("All My Recipe");
  const [mealTypeFilter, setMealTypeFilter] = useState("All");
  const [caloriesFilter, setCaloriesFilter] = useState([0, 1000]);

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
