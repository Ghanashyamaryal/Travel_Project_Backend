import mongoose from "mongoose";

const TrekSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Hard", "Extreme"],
      required: true,
    },
    duration: {
      days: { type: Number, required: true },
      nights: { type: Number, required: true },
    },
    maxAltitude: {
      type: Number, 
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    profileImage: {
      type: [String],
    },
    bestSeasons: {
      type: [String],
    },
    guideRequired: {
      type: Boolean,
      default: true,
    },
    costPerPerson: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

const Trek = mongoose.model("Trek", TrekSchema);
export default Trek;
