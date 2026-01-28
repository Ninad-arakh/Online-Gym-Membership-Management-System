import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    // Internal identifier (used in backend logic)
    slug: {
      type: String,
      required: true,
      unique: true,
      enum: ["free", "basic", "pro", "elite"],
    },

    // Display name (UI)
    title: {
      type: String,
      required: true,
    },

    // Price in INR
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // Monthly / Yearly
    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },

    // Duration (30, 365 etc.)
    durationInDays: {
      type: Number,
      required: true,
    },

    // Short UI description
    description: {
      type: String,
    },

    // Feature list for UI rendering
    features: {
      type: [String],
      default: [],
    },

    // Used to highlight Pro plan
    isPopular: {
      type: Boolean,
      default: false,
    },

    // Access control flags (VERY IMPORTANT)
    access: {
      workoutLibrary: { type: Boolean, default: false },
      personalizedWorkout: { type: Boolean, default: false },
      dietPlan: { type: Boolean, default: false },
      personalizedDiet: { type: Boolean, default: false },
      trainerChat: { type: Boolean, default: false },
      liveSessions: { type: Boolean, default: false },
      progressTracking: { type: Boolean, default: false },
      prioritySupport: { type: Boolean, default: false },
    },

    // Soft delete (never actually delete plans)
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema);
