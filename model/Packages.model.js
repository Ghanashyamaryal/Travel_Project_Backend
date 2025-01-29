import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    profileImage: {
      type: [String], 
    },
    destination: {
      type: String,
      required: true,
    },
    duration: {
      days: { type: Number, required: true },
      nights: { type: Number, required: true },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number, 
      default: 0,
    },
    inclusions: {
      type: [String], // Array of included services (e.g., "Accommodation", "Meals", "Transport")
    },
    exclusions: {
      type: [String], 
    },

    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String, maxlength: 500 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date, 
    },
    endDate: {
      type: Date, 
    },
  },
  {
    timestamps: true, 
  }
);

const Package = mongoose.model("Package", PackageSchema);
export default Package;
