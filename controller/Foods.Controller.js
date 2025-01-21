import Food from "../model/Food.model.js";

export const createFood = async (req, res) => {
    try {
        const newFood = new Food(req.body);
        await newFood.save();
        res.status(201).json({ message: "Food created successfully.", food: newFood });
    } catch (error) {
        res.status(500).json({ message: "Error creating food item.", error: error.message });
    }
};

export const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving food items.", error: error.message });
    }
};

export const getFoodById = async (req, res) => {
    const { id } = req.params;
    try {
        const food = await Food.findById(id);
        if (!food) {
            return res.status(404).json({ message: "Food item not found." });
        }
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving food item.", error: error.message });
    }
};

export const updateFoodById = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedFood = await Food.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedFood) {
            return res.status(404).json({ message: "Food item not found." });
        }
        res.status(200).json({ message: "Food item updated successfully.", food: updatedFood });
    } catch (error) {
        res.status(500).json({ message: "Error updating food item.", error: error.message });
    }
};

export const deleteFoodById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFood = await Food.findByIdAndDelete(id);
        if (!deletedFood) {
            return res.status(404).json({ message: "Food item not found." });
        }
        res.status(200).json({ message: "Food item deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting food item.", error: error.message });
    }
};
