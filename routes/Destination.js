
import express from "express";
import { 
    createDestination,
    getAllDestinations,
    getDestinationById,
    updateDestinationById,
    deleteDestinationById,
    getDestinationReviews,
    addDestinationReview
} from "../controller/Destination.controller.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/", upload.single('profileImage'),createDestination);

router.get("/", getAllDestinations);

router.get("/:id", getDestinationById);

router.put("/:id",upload.single('profileImage'), updateDestinationById);

router.delete("/:id", deleteDestinationById);

router.get("/:id/reviews", getDestinationReviews);

router.post("/:id/reviews", addDestinationReview);

export default router;
