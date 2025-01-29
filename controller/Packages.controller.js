import Package from  "../model/Packages.model.js"

export const createPackage = async (req, res) => {
    try {
        const { title, description,destination, duration, price,discount,inclusions,exclusions,rating } = req.body;
    
        const profileImage = req.file ? req.file.filename : null;
    
        const newPackage = new Package({
          title,
          description,
          destination,
          duration,
          price,
          discount,
          inclusions,
          exclusions,
          rating,
          profileImage, 
        });
        await newPackage.save();
        console.log(newPackage)
        res.status(201).json({ message: "Package created successfully.", package: newPackage });
    } catch (error) {
        res.status(500).json({ message: "Error creating package.", error: error.message });
    }
};

export const getPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving packages.", error: error.message });
    }
};


export const getPackageById = async (req, res) => {
    const { id } = req.params;
    try {
        const packages = await Package.findById(id);
        if (!packages) {
            return res.status(404).json({ message: "Package not found." });
        }
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving package.", error: error.message });
    }
};



export const updatePackageById = async (req, res) => {
    const { id } = req.params;
    try {
      const updateData = { ...req.body };
  
      if (req.file) {
        updateData.profileImage = req.file.filename;
      }
  
      const updatedPackage = await Package.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedPackage) {
        return res.status(404).json({ message: "Package not found." });
      }
  
      res.status(200).json({
        message: "Package updated successfully.",
        Package: updatedPackage,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating Package.", error: error.message });
    }
  };

export const deletePackage = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPackage = await Package.findByIdAndDelete(id);
        if (!deletedPackage) {
            return res.status(404).json({ message: "Package not found." });
        }
        res.status(200).json({ message: "Package deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting package.", error: error.message });
    }
};
