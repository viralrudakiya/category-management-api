import { NextFunction, Request, Response } from "express";
import Category from "../../src/models/Category";

export const createCategory = async (req: Request, res: Response) => {
  const { name, parent } = req.body;
  const category = new Category({ name, parent });
  await category.save();
  res.json(category);
};

interface CategoryType {
  _id: string;
  name: string;
  status: string;
  parent?: string | null;
  children?: CategoryType[];
}

const buildCategoryTree = (
  categories: CategoryType[],
  parentId: string | null = null
): CategoryType[] => {
  return categories
    .filter((category) => category.parent === parentId)
    .map((category) => ({
      ...category,
      children: buildCategoryTree(categories, category._id),
    }));
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find().lean();

    // Convert ObjectId fields to strings
    const formattedCategories: CategoryType[] = categories.map((category) => ({
      _id: category._id.toString(),
      name: category.name,
      status: category.status,
      parent: category.parent ? category.parent.toString() : null,
    }));

    const categoryTree = buildCategoryTree(formattedCategories);

    res.json(categoryTree);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { name, status } = req.body;

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, status },
    { new: true }
  );

  if (status === "inactive") {
    // Update child categories to point to the deleted category's parent
    await Category.updateMany(
      { parent: category?._id },
      { status: "inactive" }
    );
  }

  res.json(category);
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // Update child categories to point to the deleted category's parent
    await Category.updateMany(
      { parent: category._id },
      { parent: category.parent }
    );

    // Delete the category
    await category.deleteOne();

    res.json({ message: "Category deleted" });
  } catch (error) {
    next(error); // Pass error to Express error handler
  }
};
