
import express from "express";
import { 
    createFestival,
    getAllFestivals,
    getFestivalById,
    updateFestivalById,
    deleteFestivalById
} from "../controller/Festival.controller.js"

const router = express.Router();


router.post("/", createFestival);

router.get("/", getAllFestivals);

router.get("/:id", getFestivalById);

router.put("/:id", updateFestivalById);

router.delete("/:id", deleteFestivalById);

export default router;
