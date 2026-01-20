import mongoose, { model, mongo, Schema } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin", "rider"],
    default: "user",
  },
});
// const userSchema = new Schema({
//  firstName: String,
//  lastName: String,
//  email: String,
//  password: String,
//  phoneNumber: String
// });

const User = model("Users", userSchema);

export default User;
