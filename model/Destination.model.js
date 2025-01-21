import mongoose from "mongoose";

const DestinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    location: {
      country: { type: String, required: true },
      state: { type: String },
      city: { type: String },
      coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    images: {
      type: [String], 
    },
    bestTimeToVisit: {
      type: [String], // Example: ["Spring", "Autumn"]
    },
    activities: {
      type: [String], // Example: ["Hiking", "Photography", "Camping"]
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    
  },
  { timestamps: true }
);

const Destination = mongoose.model("Destination", DestinationSchema);
export default Destination;
