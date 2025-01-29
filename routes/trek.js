
import express from "express";
import { 
    createTrek,
    getAllTreks,
    getTrekById,
    updateTrekById,
    deleteTrekById
} from "../controller/Trek.controller.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();


router.post("/", upload.single('profileImage'),createTrek);

router.get("/", getAllTreks);

router.get("/:id", getTrekById);

router.put("/:id",upload.single('profileImage'), updateTrekById);

router.delete("/:id", deleteTrekById);

export default router;
