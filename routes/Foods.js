import express from "express";
import { 
    createFood,
    getAllFoods,
    getFoodById,
    updateFoodById,
    deleteFoodById
} from  "../controller/Foods.Controller.js"

const router = express.Router();

router.post("/", createFood);

router.get("/", getAllFoods);

router.get("/:id", getFoodById);

router.put("/:id", updateFoodById);

router.delete("/:id", deleteFoodById);

export default router;
