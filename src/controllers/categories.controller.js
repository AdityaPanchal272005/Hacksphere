import Category from '../models/Category.js';
import { NotFoundError, ConflictError } from '../middleware/errors.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    if (!category) {
      return next(new NotFoundError('Category not found.'));
    }
    await category.deleteOne();
    res.json({ message: 'Category removed successfully.' });
  } catch (err) {
    next(err);
  }
};