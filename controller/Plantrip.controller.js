import PlanTrip from "../model/Plantrip.model.js"


export const createPlanTrip = async (req, res) => {
  try {
    const { name, email, phone, destination, travelDates, preferences, budget,numberOfPeople,friendEmail } = req.body;
    const newPlan = new PlanTrip({
      name,
      email,
      phone,
      destination,
      travelDates,   
      preferences,
      budget,
      friendEmail,
      numberOfPeople,
      friendEmail
    });

    
    await newPlan.save();
    
    res.status(201).json({ message: "Trip planned successfully!", plan: newPlan });
  } catch (error) {
    res.status(500).json({ message: "Error creating trip plan.", error: error.message });
  }
};
export const shareTrip = async (req, res) => {
  const { friendEmail, message } = req.body;
  try {
    await sendEmail(friendEmail, message);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Could not share the trip details.' });
  }
};


export const getPlanTrips = async (req, res) => {
  try {
    const plans = await PlanTrip.find().populate("destination");
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trip plans.", error: error.message });
  }
};


export const getPlanTripById = async (req, res) => {
  const { id } = req.params;
  try {
    const plan = await PlanTrip.findById(id).populate("destination");
    if (!plan) {
      return res.status(404).json({ message: "Trip plan not found." });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trip plan.", error: error.message });
  }
};


export const updatePlanTrip = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPlan = await PlanTrip.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPlan) {
      return res.status(404).json({ message: "Trip plan not found." });
    }
    res.status(200).json({ message: "Trip plan updated successfully!", plan: updatedPlan });
  } catch (error) {
    res.status(500).json({ message: "Error updating trip plan.", error: error.message });
  }
};


export const deletePlanTrip = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPlan = await PlanTrip.findByIdAndDelete(id);
    if (!deletedPlan) {
      return res.status(404).json({ message: "Trip plan not found." });
    }
    res.status(200).json({ message: "Trip plan deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting trip plan.", error: error.message });
  }
};
