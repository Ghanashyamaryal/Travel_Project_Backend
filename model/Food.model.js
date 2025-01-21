import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
    },
    category: {
      type: String,
      required: true, // Category of the food item (e.g., Veg, Non-Veg, Vegan)
    },
    description: {
      type: String,
      required: true, 
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    ingredients: {
      type: [String], 
    }
  },
  { timestamps: true } 
);

const Food = mongoose.model("Food", foodSchema);


export default Food;
