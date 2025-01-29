import Hotel from "../model/Hotel.model.js";

export const createHotel = async (req, res) => {
  try {
    const {
      name,
      description,
      phone,
      starRating,
      website,
      rating,
      priceRange,
      address,
    } = req.body;

    const profileImage = req.file ? req.file.filename : null;

    const newHotel = new Hotel({
      name,
      description,
      phone,
      starRating,
      website,
      rating,
      priceRange,
      address,
      profileImage,
    });

    await newHotel.save();
    res
      .status(201)
      .json({ message: 'Hotel created successfully.', hotel: newHotel });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating hotel.', error: error.message });
  }
};

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving hotels.', error: error.message });
  }
};

export const getHotelById = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found.' });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving hotel.', error: error.message });
  }
};

export const updateHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.profileImage = req.file.filename;
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found.' });
    }

    res
      .status(200)
      .json({ message: 'Hotel updated successfully.', hotel: updatedHotel});
    } catch (error) {
      res.status(500).json({ message: 'Error updating hotel.', error: error.message });
    }
  };
  
  export const deleteHotel = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedHotel = await Hotel.findByIdAndDelete(id);
      if (!deletedHotel) {
        return res.status(404).json({ message: 'Hotel not found.' });
      }
      res.status(200).json({ message: 'Hotel deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting hotel.', error: error.message });
    }
  };

  const Hotel = require("../models/hotelModel");

export const getHotelReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.json(hotel.reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error });
    }
};

export const addHotelReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        if (!rating || !comment) {
            return res.status(400).json({ message: "Rating and comment are required" });
        }

        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        hotel.reviews.push({ rating, comment });
        await hotel.save();

        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error });
    }
};
