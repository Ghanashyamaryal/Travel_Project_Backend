import express from "express";
import {
  createPlanTrip,
  getPlanTrips,
  getPlanTripById,
  updatePlanTrip,
  deletePlanTrip,
  shareTrip
} from "../controller/Plantrip.controller.js"

const router = express.Router();

router.post("/", createPlanTrip); 
router.post("/sharetrip", shareTrip); 
router.get("/", getPlanTrips); 
router.get("/:id", getPlanTripById); 
router.put("/:id", updatePlanTrip); 
router.delete("/:id", deletePlanTrip); 

export default router;
