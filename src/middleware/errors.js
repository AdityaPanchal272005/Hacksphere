export class NotFoundError extends Error {
  constructor(message = 'Resource not found.') {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
    this.error = 'NOT_FOUND';
  }
}

export class ForbiddenError extends Error {
  constructor(message = 'Not allowed.') {
    super(message);
    this.name = 'ForbiddenError';
    this.status = 403;
    this.error = 'FORBIDDEN';
  }
}

export class UnauthorizedError extends Error {
  constructor(message = 'Token missing or invalid.') {
    super(message);
    this.name = 'UnauthorizedError';
    this.status = 401;
    this.error = 'UNAUTHORIZED';
  }
}

export class ValidationError extends Error {
  constructor(message = 'Validation failed.') {
    super(message);
    this.name = 'ValidationError';
    this.status = 422;
    this.error = 'VALIDATION_ERROR';
  }
}

export class ConflictError extends Error {
  constructor(message = 'Conflict.') {
    super(message);
    this.name = 'ConflictError';
    this.status = 409;
    this.error = 'CONFLICT';
  }
}

export const notFound = (req, res, next) => {
  next(new NotFoundError('The requested resource was not found.'));
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'UNAUTHORIZED', message: 'Token missing or invalid' });
  }

  let status = err.status || 500;
  let message = err.message || 'An unexpected error occurred.';
  let error = err.error || 'SERVER_ERROR';

  if (err.name === 'MongoServerError' && err.code === 11000) {
    status = 409;
    error = 'CONFLICT';
    if (err.message.includes('email_1')) {
      error = 'EMAIL_EXISTS';
      message = 'This email is already in use.';
    } else if (err.message.includes('name_1') || err.message.includes('slug_1')) {
      error = 'CATEGORY_EXISTS';
      message = 'A category with this name or slug already exists.';
    } else if (err.message.includes('userId_1')) {
      error = 'CART_EXISTS';
      message = 'A cart already exists for this user.';
    } else {
      message = 'A resource with this unique field already exists.';
    }
  }

  if (err.name === 'ValidationError') {
    error = 'VALIDATION_ERROR';
    status = 422;
    message = err.details ? err.details.map((d) => d.message).join(', ') : err.message;
  }

  res.status(status).json({
    error,
    message,
  });
};