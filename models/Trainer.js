import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    age: {
      type: Number,
      min: 18, // optional: trainers must be adults
      max: 100, // optional safety cap
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    specialization: {
      type: [String], // e.g. ["weight loss", "muscle gain"]
      default: [],
    },

    experienceYears: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true, // admin can disable trainer
    },
  },
  { timestamps: true }
);

export default mongoose.models.Trainer ||
  mongoose.model("Trainer", TrainerSchema);
