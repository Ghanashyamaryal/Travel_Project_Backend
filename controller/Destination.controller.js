import Destination from "../model/Destination.model.js";

const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return parseFloat((totalRating / reviews.length).toFixed(1));
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const calculateCosineSimilarity = (target, destination) => {
  const targetFeatures = [...target.activities, ...target.bestTimeToVisit];
  const destinationFeatures = [...destination.activities, ...destination.bestTimeToVisit];

  const targetSet = new Set(targetFeatures);
  const destinationSet = new Set(destinationFeatures);

  let commonFeatures = 0;
  targetSet.forEach(feature => {
    if (destinationSet.has(feature)) commonFeatures++;
  });

  const targetSize = targetSet.size;
  const destinationSize = destinationSet.size;

  if (targetSize === 0 || destinationSize === 0) return 0;
  return commonFeatures / (Math.sqrt(targetSize) * Math.sqrt(destinationSize));
};

const getDestinationRecommendations = async (targetDest) => {
  try {
    const allDestinations = await Destination.find({
      _id: { $ne: targetDest._id },
      type: targetDest.type
    });

    const maxDistance = 100;
    
    return allDestinations
      .map(dest => {
        const distance = calculateDistance(
          targetDest.location.latitude,
          targetDest.location.longitude,
          dest.location.latitude,
          dest.location.longitude
        );
        
        const distanceScore = 1 - Math.min(distance / maxDistance, 1);
        const cosineSim = calculateCosineSimilarity(targetDest, dest);
        const ratingScore = dest.rating / 5;
        const similarityScore = (distanceScore * 0.3) + (cosineSim * 0.3) + (ratingScore * 0.4);

        return {
          ...dest.toObject(),
          similarityScore: Number(similarityScore.toFixed(2)),
          distance: Math.round(distance * 100) / 100
        };
      })
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, 4);
  } catch (error) {
    throw new Error(`Error in destination recommendation engine: ${error.message}`);
  }
};

export const createDestination = async (req, res) => {
  const { name, description, location, type, activities, bestTimeToVisit } = req.body;

  if (!location?.latitude || !location?.longitude) {
    return res.status(400).json({ message: "Location coordinates are required" });
  }

  try {
    const newDestination = new Destination({
      name,
      description,
      type,
      location,
      activities: activities || [],
      bestTimeToVisit: bestTimeToVisit || [],
      rating: 0, 
      profileImage: req.file?.filename || null,
      reviews: []
    });

    await newDestination.save();
    res.status(201).json({
      message: "Destination created successfully",
      destination: newDestination
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating destination",
      error: error.message
    });
  }
};

export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    const destinationWithRating = destinations.map(destination => ({
      ...destination.toObject(),
      averageRating: calculateAverageRating(destination.reviews)
    }));
    res.status(200).json(destinationWithRating);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching destinations",
      error: error.message
    });
  }
};

export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    const recommendations = await getDestinationRecommendations(destination);
    const averageRating = calculateAverageRating(destination.reviews);
    res.status(200).json({
      ...destination.toObject(),averageRating,
      recommendations: recommendations.map(rec => ({
        _id: rec._id,
        name: rec.name,
        type: rec.type,
        averageRating: calculateAverageRating(rec.reviews),
        location:rec.location,
        distance: rec.distance,
        similarityScore: rec.similarityScore,
        profileImage: rec.profileImage,
        activities:rec.activities
      }))
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching destination",
      error: error.message
    });
  }
};

export const updateDestinationById = async (req, res) => {
  const updates = { ...req.body };

  if (req.file) updates.profileImage = req.file.filename;
  if (updates.rating) updates.rating = Math.min(Math.max(updates.rating, 0), 5);

  try {
    const updatedDest = await Destination.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updatedDest) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json({
      message: "Destination updated successfully",
      destination: updatedDest
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating destination",
      error: error.message
    });
  }
};

export const deleteDestinationById = async (req, res) => {
  try {
    const deletedDest = await Destination.findByIdAndDelete(req.params.id);
    if (!deletedDest) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting destination",
      error: error.message
    });
  }
};

export const getDestinationReviews = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json(destination.reviews || []);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reviews",
      error: error.message
    });
  }
};
export const addDestinationReview = async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({ message: "Rating and comment are required" });
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be an integer between 1 and 5" });
  }

  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    destination.reviews.push({ rating: Number(rating), comment });
    const averageRating = calculateAverageRating(destination.reviews);
    destination.rating = averageRating; // Update destination's rating
    await destination.save();

    res.status(201).json({
      message: "Review added successfully",
      averageRating,
      review: destination.reviews[destination.reviews.length - 1]
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding review",
      error: error.message
    });
  }
};