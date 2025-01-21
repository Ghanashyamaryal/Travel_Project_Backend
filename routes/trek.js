
import express from "express";
import { 
    createTrek,
    getAllTreks,
    getTrekById,
    updateTrekById,
    deleteTrekById
} from "../controller/Trek.controller.js";

const router = express.Router();


router.post("/", createTrek);

router.get("/", getAllTreks);

router.get("/:id", getTrekById);

router.put("/:id", updateTrekById);

router.delete("/:id", deleteTrekById);

export default router;
