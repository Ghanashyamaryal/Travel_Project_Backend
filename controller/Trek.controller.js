
import Trek from "../model/Trek.model.js";

export const createTrek = async (req, res) => {
    try {
        const newTrek = new Trek(req.body);
        await newTrek.save();
        res.status(201).json({ message: "Trek created successfully.", trek: newTrek });
    } catch (error) {
        res.status(500).json({ message: "Error creating trek.", error: error.message });
    }
};


export const getAllTreks = async (req, res) => {
    try {
        const treks = await Trek.find();
        res.status(200).json(treks);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving treks.", error: error.message });
    }
};


export const getTrekById = async (req, res) => {
    const { id } = req.params;
    try {
        const trek = await Trek.findById(id);
        if (!trek) {
            return res.status(404).json({ message: "Trek not found." });
        }
        res.status(200).json(trek);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving trek.", error: error.message });
    }
};


export const updateTrekById = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTrek = await Trek.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTrek) {
            return res.status(404).json({ message: "Trek not found." });
        }
        res.status(200).json({ message: "Trek updated successfully.", trek: updatedTrek });
    } catch (error) {
        res.status(500).json({ message: "Error updating trek.", error: error.message });
    }
};


export const deleteTrekById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTrek = await Trek.findByIdAndDelete(id);
        if (!deletedTrek) {
            return res.status(404).json({ message: "Trek not found." });
        }
        res.status(200).json({ message: "Trek deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting trek.", error: error.message });
    }
};
