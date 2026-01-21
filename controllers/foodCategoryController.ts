import { Request, Response } from "express";
import FoodCategory from "../models/FoodCategory";

export const createFoodCategory = async (req: Request, res: Response) => {
  const { name, isActive } = req.body;

  const foodCategory = await FoodCategory.create({
    name,
    isActive,
  });

  res.status(201).json({
    message: "FoodCategory created succesfully",
    foodCategory,
  });
};
export const deleteFoodCatgory = async (req: Request, res: Response) => {
  const { id } = req.params;

  // this make a query and deletes based on that query. it also returns the information delete
  //   const foodCategory = await FoodCategory.findOneAndDelete({
  //     _id: id,
  //   });

  const foodCategory = await FoodCategory.findOne({
    _id: id,
  });

  if (foodCategory == null) {
    return res.status(404).json({
      message: "Food Category not found",
    });
  }

  await FoodCategory.deleteOne({
    _id: id,
  });

  return res.status(200).json({
    message: "Food Category Deleted",
    foodCategory,
  });
};
export const updateFoodCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, isActive } = req.body;

  // this query finds using the id and then updates the infomation passed
  //   const foodCategory = await FoodCategory.findByIdAndUpdate(id, {
  //     name,
  //     isActive,
  //   });

  const foodCategory = await FoodCategory.findOne({
    _id: id,
  });

  if (foodCategory == null) {
    return res.status(404).json({
      message: "Food Category Not Found",
    });
  }

  await FoodCategory.updateOne(
    {
      _id: id,
    },
    {
      name,
      isActive,
    },
  );

  return res.status(200).json({
    message: "Food Category updated successfully",
  });
};
export const getFoodCategoryWithMenuItems = async (
  req: Request,
  res: Response,
) => {
  const foodCategory = await FoodCategory.find();

  return res.status(200).json({
    message: "FoodCategory!",
    foodCategory,
  });
};
