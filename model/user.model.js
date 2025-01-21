import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, 
      match: [/.+@.+\..+/, "Please enter a valid email address"], 
    },
    password: {
      type: String,
      required: true,
      minlength: 6, 
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", 
    },
    // profileImage: {
    //   type: String, 
    //   default: "https://example.com/default-avatar.png", 
    // },
  //   dateOfBirth: {
  //     type: Date,
  //   },
  //   address: {
  //     city: { type: String },
  //     country: { type: String },
  //   },
  //   phone: {
  //     type: String,
  //     match: [/^\d{10}$/, "Please enter a valid phone number"], 
  //   },
  
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);


const User = mongoose.model("User", UserSchema);
export default User;
