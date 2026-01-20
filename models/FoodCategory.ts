import mongoose, { model, mongo, Schema } from "mongoose";

const FoodCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  // this is a one t many relationship between food category and MenuItems
  // a food category can have many items
  menuItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "MenuItem",
    },
  ],
});

const FoodCategory = model("FoodCategory", FoodCategorySchema);

export default FoodCategory;
