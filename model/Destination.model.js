import mongoose from "mongoose";

const DestinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    type:{
      type:String
    },
    location: {
      country: { type: String, required: true },
      state: { type: String },
      city: { type: String },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    reviews: [
      {
          rating: { type: Number, required: true,default:1 },
          comment: { type: String, required: true ,default:""},
      }],
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    profileImage: {
      type: String, 
    },
    bestTimeToVisit: {
      type: [String], 
    },
    activities: {
      type: [String],
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
