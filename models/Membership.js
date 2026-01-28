import mongoose from "mongoose";

const MembershipSchema = new mongoose.Schema(
  {
    // User owning this membership
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      default: null,
    },

    // Plan reference
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    // Snapshot data (VERY IMPORTANT)
    planSlug: {
      type: String,
      enum: ["free", "basic", "pro", "elite"],
      required: true,
    },

    planTitle: {
      type: String,
      required: true,
    },

    pricePaid: {
      type: Number,
      required: true,
      min: 0,
    },

    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },

    // Membership lifecycle
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["trial", "active", "expired", "cancelled"],
      default: "trial",
    },

    // Trial handling
    isTrial: {
      type: Boolean,
      default: false,
    },

    trialEndsAt: {
      type: Date,
    },

    // Payment integration (Razorpay-ready)
    payment: {
      provider: {
        type: String,
        enum: ["razorpay", "stripe", "manual"],
      },
      orderId: String,
      paymentId: String,
      signature: String,
    },

    // Renewal & control
    autoRenew: {
      type: Boolean,
      default: false,
    },

    cancelledAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Membership ||
  mongoose.model("Membership", MembershipSchema);
