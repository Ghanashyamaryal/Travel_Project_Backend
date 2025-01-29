
import Trek from "../model/Trek.model.js";

export const createTrek = async (req, res) => {
    try {
        const { name, description, difficulty,duration, maxAltitude, destination,bestSeasons,guideRequired,costPerPerson, } = req.body;
    
        const profileImage = req.file ? req.file.filename : null;
    
        const newTrek = new Trek({
          name,
          description,
          difficulty,
          duration,
          maxAltitude,
          destination,
          destination, 
          bestSeasons,
          guideRequired,
          profileImage,
          costPerPerson
        });
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
      const updateData = { ...req.body };
  
      if (req.file) {
        updateData.profileImage = req.file.filename;
      }
  
      const updatedTrek = await Trek.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedTrek) {
        return res.status(404).json({ message: "Trek not found." });
      }
  
      res.status(200).json({
        message: "Trek updated successfully.",
        Trek: updatedTrek,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating Trek.", error: error.message });
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
