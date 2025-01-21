import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500, 
    },
    profileImage: {
      type: String,
      default: "https://example.com/default-hotel.png", 
    },
    images: {
      type: [String], // Array of image URLs
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, match: [/^\d{5}$/, "Invalid zip code"] },
    },
    phone: {
      type: String,
      match: [/^\d{10}$/, "Please enter a valid phone number"],
    },
    website: {
      type: String,
      match: [/^https?:\/\/.+\..+/, "Please enter a valid website URL"], 
    },
    priceRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    rating: {
      type: Number,
      min: 0,
      max: 5, 
      default: 0,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String, maxlength: 500 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    availability: {
      type: Boolean,
      default: true,
    },
    checkInTime: {
      type: String, 
    },
    checkOutTime: {
      type: String, 
    },
   
  },
  {
    timestamps: true, 
  }
);


const Hotel = mongoose.model("Hotel", HotelSchema);
export default Hotel;
