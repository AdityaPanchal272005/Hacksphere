import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { NotFoundError, ConflictError } from '../middleware/errors.js';

export const createOrderFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart || cart.items.length === 0) {
      return next(new NotFoundError('Cart is empty. Cannot create an order.'));
    }
    // Calculate total from cart items
    const total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const newOrder = new Order({
      userId: req.user.id,
      items: cart.items,
      total,
    });
    await newOrder.save();
    // Clear the cart after creating the order
    cart.items = [];
    await cart.save();
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};