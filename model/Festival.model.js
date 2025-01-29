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
    season: {
      type: [String],
      
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Festival = mongoose.model("Festival", FestivalSchema);
export default Festival;
