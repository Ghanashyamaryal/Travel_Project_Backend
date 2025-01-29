import express from 'express';
import {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
  getHotelReviews,
  addHotelReview
} from "../controller/Hotel.controller.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post('/', upload.single('profileImage'), createHotel);
router.get('/', getHotels);
router.get('/:id', getHotelById);
router.delete('/:id', deleteHotel);
router.get("/:id/reviews", getHotelReviews);
router.post("/:id/reviews", addHotelReview);
router.put('/:id', upload.single('profileImage'), updateHotel);

export default router;