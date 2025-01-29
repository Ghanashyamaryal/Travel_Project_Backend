
import Festival from "../model/Festival.model.js";


export const createFestival = async (req, res) => {
    try {
        const { name, description, season } = req.body;

        const profileImage = req.file ? req.file.filename : null;
    
        const newFestival = new Festival({
          name,
          description,
          season,
          profileImage, 
        });
        
        await newFestival.save();
        res.status(201).json({ message: "Festival created successfully.", festival: newFestival });
    } catch (error) {
        res.status(500).json({ message: "Error creating festival.", error: error.message });
    }
};


export const getAllFestivals = async (req, res) => {
    try {
        const festivals = await Festival.find();
        res.status(200).json(festivals);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving festivals.", error: error.message });
    }
};


export const getFestivalById = async (req, res) => {
    const { id } = req.params;
    try {
        const festival = await Festival.findById(id);
        if (!festival) {
            return res.status(404).json({ message: "Festival not found." });
        }
        res.status(200).json(festival);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving festival.", error: error.message });
    }
};



export const updateFestivalById = async (req, res) => {
    const { id } = req.params;
    try {
      const updateData = { ...req.body };
  
      if (req.file) {
        updateData.profileImage = req.file.filename;
      }
  
      const updatedFestival = await Festival.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedFestival) {
        return res.status(404).json({ message: "Festival not found." });
      }
  
      res.status(200).json({
        message: "Festival updated successfully.",
        Festival: updatedFestival,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating Festival.", error: error.message });
    }
  };


export const deleteFestivalById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFestival = await Festival.findByIdAndDelete(id);
        if (!deletedFestival) {
            return res.status(404).json({ message: "Festival not found." });
        }
        res.status(200).json({ message: "Festival deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting festival.", error: error.message });
    }
};
