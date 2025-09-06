import Cart from '../models/Cart.js';
import User from '../models/User.js';
import { NotFoundError, ConflictError } from '../middleware/errors.js';

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.listingId');
    if (!cart) {
      // In a real application, you might create a new cart here instead of an error.
      return next(new NotFoundError('Cart not found for this user.'));
    }
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  const { listingId, qty, title, price, imageUrl } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      const existingItem = cart.items.find(item => item.listingId.toString() === listingId);
      if (existingItem) {
        existingItem.qty += qty;
      } else {
        cart.items.push({ listingId, qty, title, price, imageUrl });
      }
      await cart.save();
      return res.status(200).json(cart);
    }
    const newCart = new Cart({
      userId: req.user.id,
      items: [{ listingId, qty, title, price, imageUrl }],
    });
    await newCart.save();
    res.status(201).json(newCart);
  } catch (err) {
    next(err);
  }
};

export const updateCartItem = async (req, res, next) => {
  const { qty } = req.body;
  const { id } = req.params; // Item ID
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return next(new NotFoundError('Cart not found.'));
    }
    const item = cart.items.id(id);
    if (!item) {
      return next(new NotFoundError('Item not found in cart.'));
    }
    item.qty = qty;
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

export const removeCartItem = async (req, res, next) => {
  const { id } = req.params; // Item ID
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return next(new NotFoundError('Cart not found.'));
    }
    cart.items.pull({ _id: id });
    await cart.save();
    res.status(200).json({ message: 'Item removed from cart.' });
  } catch (err) {
    next(err);
  }
};