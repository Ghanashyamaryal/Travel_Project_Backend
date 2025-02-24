import Hotel from "../model/Hotel.model.js";

const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return parseFloat((total / reviews.length).toFixed(1));
};

const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return normA && normB ? dotProduct / (normA * normB) : 0;
};

const hotelToVector = (hotel) => {
  const avgRating = calculateAverageRating(hotel.reviews);
  return [
    avgRating,
    hotel.starRating || 0,
    hotel.priceRange?.min || 0,
    hotel.priceRange?.max || 0,
    hotel.amenities?.length || 0
  ];
};

const getRecommendedHotels = async (targetHotel) => {
  try {
    const allHotels = await Hotel.find({
      _id: { $ne: targetHotel._id },
      "address.city": targetHotel.address.city,
      "starRating":targetHotel.starRating
    });

    const targetVector = hotelToVector(targetHotel);
    
    return allHotels
      .map((hotel) => ({
        hotel: hotel.toObject(),
        similarity: cosineSimilarity(targetVector, hotelToVector(hotel))
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 4)
      .map((item) => item.hotel);
  } catch (error) {
    throw new Error("Error generating recommendations");
  }
};

export const createHotel = async (req, res) => {
  try {
    const { name, description, phone, starRating, website, priceRange, address } = req.body;

    if (!name || !description || !phone) {
      return res.status(400).json({ message: "Name, description, and phone are required." });
    }

    const newHotel = new Hotel({
      name,
      description,
      phone,
      starRating: Number(starRating) || 0,
      website,
      priceRange,
      address,
      profileImage: req.file?.filename,
      reviews: []
    });

    await newHotel.save();
    res.status(201).json({ message: "Hotel created successfully.", hotel: newHotel });
  } catch (error) {
    res.status(500).json({ message: "Error creating hotel.", error: error.message });
  }
};

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    const hotelsWithRating = hotels.map(hotel => ({
      ...hotel.toObject(),
      averageRating: calculateAverageRating(hotel.reviews)
    }));
    res.status(200).json(hotelsWithRating);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving hotels.", error: error.message });
  }
};

export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found." });
    }

    
    const recommendations = await getRecommendedHotels(hotel);
    const averageRating = calculateAverageRating(hotel.reviews);

    res.status(200).json({
      hotel: { ...hotel.toObject(), averageRating },
      recommendedHotels: recommendations.map(hotel => ({
        ...hotel,
        averageRating: calculateAverageRating(hotel.reviews)
      }))
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving hotel.", error: error.message });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.profileImage = req.file.filename;

    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found." });
    }

    res.status(200).json({ message: "Hotel updated successfully.", hotel: updatedHotel });
  } catch (error) {
    res.status(500).json({ message: "Error updating hotel.", error: error.message });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found." });
    }
    res.status(200).json({ message: "Hotel deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hotel.", error: error.message });
  }
};

export const getHotelReviews = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found." });
    }
    res.status(200).json(hotel.reviews || []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews.", error: error.message });
  }
};

export const addHotelReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment are required." });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be an integer between 1 and 5." });
    }

    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found." });
    }

    hotel.reviews.push({ rating: Number(rating), comment });
    await hotel.save();

    const averageRating = calculateAverageRating(hotel.reviews);

    res.status(201).json({
      message: "Review added successfully.",
      averageRating,
      review: hotel.reviews[hotel.reviews.length - 1]
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding review.", error: error.message });
  }
};