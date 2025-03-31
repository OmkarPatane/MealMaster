import mongoose from "mongoose";

const CalendarSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  calories: { type: Number, required: true },
  mealType: { type: String, required: true },
  date: { type: String, required: true },
  recipe: { type: String, required: true },
  ingredients: { type: [String], required: true },
});

  const CalendarModel = mongoose.model("Calendar", CalendarSchema);

export default CalendarModel;
