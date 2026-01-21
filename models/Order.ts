import mongoose, { model, mongo, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true },
);

const Orders = model("Orders", OrderSchema);

export default Orders;
