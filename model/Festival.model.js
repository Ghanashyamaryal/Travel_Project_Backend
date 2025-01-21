import mongoose from "mongoose";

const FestivalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    traditions: {
      type: [String], // Example: ["Lighting lamps", "Cultural dances", "Fasting"]
    },
    images: {
      type: [String], // Array of image URLs
    },
  },
  { timestamps: true }
);

const Festival = mongoose.model("Festival", FestivalSchema);
export default Festival;
