import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
    amount: Number,
    status: { type: String, default: "success" },
    razorpayOrderId : {type : String, required : true},
    paymentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
