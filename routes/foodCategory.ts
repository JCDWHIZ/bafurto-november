import express from "express";
import {
  createFoodCategory,
  deleteFoodCatgory,
  getFoodCategoryWithMenuItems,
  updateFoodCategory,
} from "../controllers/foodCategoryController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();

router.route("/").post(authMiddleware, createFoodCategory);
router.route("/").get(getFoodCategoryWithMenuItems);
router.route("/:id").delete(deleteFoodCatgory);
router.route("/:id").put(updateFoodCategory);

module.exports = router;
