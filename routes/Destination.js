// destination.routes.js
import express from "express";
import { 
    createDestination,
    getAllDestinations,
    getDestinationById,
    updateDestinationById,
    deleteDestinationById
} from "../controller/Destination.controller.js";

const router = express.Router();

router.post("/", createDestination);

router.get("/", getAllDestinations);

router.get("/:id", getDestinationById);

router.put("/:id", updateDestinationById);

router.delete("/:id", deleteDestinationById);

export default router;
