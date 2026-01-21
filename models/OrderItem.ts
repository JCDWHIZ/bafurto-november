import mongoose, { model, mongo, Schema } from "mongoose";

const OrderItemSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    menuItemId: {
      type: Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
  },
  { timestamps: true },
);

const OrderItem = model("OrderItem", OrderItemSchema);

export default OrderItem;
