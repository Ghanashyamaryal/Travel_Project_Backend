import Destination from "../model/Destination.model.js";

export const createDestination = async (req, res) => {
  try {
    const { name, description, location,type, rating, activities, bestTimeToVisit } = req.body;

    const profileImage = req.file ? req.file.filename : null;

    const newDestination = new Destination({
      name,
      description,
      type,
      location,
      activities,
      bestTimeToVisit,
      rating,
      profileImage,
    });

    await newDestination.save();
    res.status(201).json({
      message: "Destination created successfully.",
      destination: newDestination,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating destination.", error: error.message });
  }
};

export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving destinations.", error: error.message });
  }
};

export const getDestinationById = async (req, res) => {
  const { id } = req.params;
  try {
    const destination = await Destination.findById(id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found." });
    }
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving destination.", error: error.message });
  }
};

export const updateDestinationById = async (req, res) => {
  const { id } = req.params;
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.profileImage = req.file.filename;
    }

    const updatedDestination = await Destination.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedDestination) {
      return res.status(404).json({ message: "Destination not found." });
    }

    res.status(200).json({
      message: "Destination updated successfully.",
      destination: updatedDestination,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating destination.", error: error.message });
  }
};

export const deleteDestinationById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDestination = await Destination.findByIdAndDelete(id);
    if (!deletedDestination) {
      return res.status(404).json({ message: "Destination not found." });
    }
    res.status(200).json({ message: "Destination deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting destination.", error: error.message });
  }
};
