import mongoose, { model, mongo, Schema } from "mongoose";

const MenuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    // a menuitem must reference a foodCategory completing the one to many relationship
    foodCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "FoodCategory",
      required: true,
    },
  },
  { timestamps: true },
);

const MenuItem = model("MenuItem", MenuItemSchema);

export default MenuItem;
