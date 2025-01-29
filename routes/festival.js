
import express from "express";
import { 
    createFestival,
    getAllFestivals,
    getFestivalById,
    updateFestivalById,
    deleteFestivalById
} from "../controller/Festival.controller.js"
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();


router.post("/", upload.single('profileImage'),createFestival);

router.get("/", getAllFestivals);

router.get("/:id", getFestivalById);

router.put("/:id",upload.single('profileImage'), updateFestivalById);

router.delete("/:id", deleteFestivalById);

export default router;
