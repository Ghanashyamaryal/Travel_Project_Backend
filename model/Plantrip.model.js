import mongoose from "mongoose";

const PlanTripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
    },
    travelDates: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    preferences: {
      type: String
    },
    budget: {
      type: Number,
      required: true,
    },
    friendEmail:{
      type:String
    }
  },
  { timestamps: true }
);

const PlanTrip = mongoose.model("PlanTrip", PlanTripSchema);
export default PlanTrip;
