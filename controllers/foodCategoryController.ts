import { Request, Response } from "express";
import FoodCategory from "../models/FoodCategory";
import MenuItem from "../models/MenuItem";
import { ObjectId, Schema } from "mongoose";

type MenuItem = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
};

type MenuItemUpdateData = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
};

type FoodCategory = {
  name: string;
  isActive: boolean;
  menuItems: MenuItem[];
};

type FoodCategoryUpdateData = {
  name: string;
  isActive: boolean;
  menuItems: MenuItemUpdateData[];
};

export const createFoodCategory = async (req: Request, res: Response) => {
  const { name, isActive, menuItems } = req.body as FoodCategory;

  const foodCategory = await FoodCategory.create({
    name,
    isActive,
  });

  menuItems.forEach(async (item: any) => {
    const menu = await MenuItem.create({
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
      isAvailable: item.isAvailable,
      foodCategoryId: foodCategory._id,
    });
    foodCategory.menuItems.push(menu._id);
    await foodCategory.save();
  });
  // foodCategory.menuItems = menus;
  // console.log("food category with menut itme", foodCategory);

  // await MenuItem.insertMany(
  //   menuItems.map((item: any) => {
  //     ...item,
  //     foodCategoryId: foodCategory._id,
  //   })
  // )

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
  const { name, isActive, menuItems } = req.body as FoodCategoryUpdateData;

  // this query finds using the id and then updates the infomation passed
  //   const foodCategory = await FoodCategory.findByIdAndUpdate(id, {
  //     name,
  //     isActive,
  //   });

  const foodCategory = await FoodCategory.findOne({
    _id: id,
  });

  console.log("food category", foodCategory);

  if (foodCategory == null) {
    return res.status(404).json({
      message: "Food Category Not Found",
    });
  }

  const errors: string[] = [];

  await FoodCategory.updateOne(
    {
      _id: id,
    },
    {
      name,
      isActive,
      menuItems: [],
    },
  );

  menuItems.forEach(async (item: MenuItemUpdateData) => {
    const menu = await MenuItem.create({
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
      isAvailable: item.isAvailable,
      foodCategoryId: foodCategory._id,
    });
    foodCategory.menuItems.push(menu._id);
    await foodCategory.save();

    // const menu = await MenuItem.findOne({
    //   _id: item._id,
    // });
    // console.log("menu", menu);
    // if (menu == null) {
    //   errors.push(`item with object Id ${item._id} not found`);
    //   return;
    // } else {
    //   await MenuItem.updateOne(
    //     {
    //       _id: item._id,
    //     },
    //     {
    //       name: item.name,
    //       description: item.description,
    //       price: item.price,
    //       imageUrl: item.imageUrl,
    //       isAvailable: item.isAvailable,
    //     },
    //   );
    // }
  });

  console.log("errors", errors);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "An Error Occoured",
      errors,
    });
  } else {
    return res.status(200).json({
      message: "Food Category updated successfully",
      foodCategory,
    });
  }
};
export const getFoodCategoryWithMenuItems = async (
  req: Request,
  res: Response,
) => {
  const foodCategory = await FoodCategory.find().populate("menuItems");

  return res.status(200).json({
    message: "FoodCategory!",
    foodCategory,
  });
};
