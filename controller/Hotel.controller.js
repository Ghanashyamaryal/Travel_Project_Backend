import Hotel from "../model/Hotel.model.js";


export const createHotel = async (req, res) => {
    try {
        const newHotel = new Hotel(req.body);
        await newHotel.save();
        res.status(201).json({ message: "Hotel created successfully.", hotel: newHotel });
    } catch (error) {
        res.status(500).json({ message: "Error creating hotel.", error: error.message });
    }
};

export const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving hotels.", error: error.message });
    }
};


export const getHotelById = async (req, res) => {
    const { id } = req.params;
    try {
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found." });
        }
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving hotel.", error: error.message });
    }
};

export const updateHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedHotel) {
            return res.status(404).json({ message: "Hotel not found." });
        }
        res.status(200).json({ message: "Hotel updated successfully.", hotel: updatedHotel });
    } catch (error) {
        res.status(500).json({ message: "Error updating hotel.", error: error.message });
    }
};


export const deleteHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(id);
        if (!deletedHotel) {
            return res.status(404).json({ message: "Hotel not found." });
        }
        res.status(200).json({ message: "Hotel deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting hotel.", error: error.message });
    }
};
