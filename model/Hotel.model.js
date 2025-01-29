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
    starRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 3, 
    },
    reviews: [
      {
          rating: { type: Number, required: true },
          comment: { type: String, required: true },
      },
  ],
    website: {
      type: String,
      match: [/^https?:\/\/.+\..+/, "Please enter a valid website URL"],
    },
    priceRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    
    // rating: {
    //   type: Number,
    //   min: 0,
    //   max: 5,
    //   default: 0,
    // },
    
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", HotelSchema);
export default Hotel;
