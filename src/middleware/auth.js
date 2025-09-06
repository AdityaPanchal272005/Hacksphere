import passport from 'passport';
import { NotFoundError, ForbiddenError, UnauthorizedError } from './errors.js';

export const requireAuth = passport.authenticate('jwt', { session: false });

export const requireOwner = (modelGetter) => async (req, res, next) => {
  try {
    const resource = await modelGetter.findById(req.params.id);
    if (!resource) {
      return next(new NotFoundError('Resource not found.'));
    }
    if (resource.sellerId && resource.sellerId.toString() === req.user.id) {
      next();
    } else {
      next(new ForbiddenError('You do not have permission to access this resource.'));
    }
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new NotFoundError('Resource not found.'));
    }
    next(err);
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    next(new ForbiddenError('You are not authorized to perform this action.'));
  }
};