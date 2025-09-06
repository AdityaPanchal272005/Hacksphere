import { Joi, celebrate, Segments } from 'celebrate';

const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid ObjectId');

export const validateCheckEmail = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
});

export const validateRequestOtp = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    displayName: Joi.string().min(3).max(30).optional(),
    phoneNumber: Joi.string().required(),
  }),
});

export const validateVerifyOtp = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    otp: Joi.string().length(6).required(),
  }),
});

export const validateAuthLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const validateListing = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(1).max(120).required(),
    description: Joi.string().max(2000).optional().allow(''),
    category: Joi.string().required(),
    price: Joi.number().min(0).required(),
    imageUrl: Joi.string().uri().optional().allow(''),
  }),
});

export const validateUserUpdate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    displayName: Joi.string().min(3).max(30).optional(),
  }).min(1),
});

export const validateCartAddItem = celebrate({
  [Segments.BODY]: Joi.object().keys({
    listingId: objectId.required(),
    qty: Joi.number().integer().min(1).max(10).default(1),
  }),
});

export const validateCartRemoveItem = celebrate({
  [Segments.BODY]: Joi.object().keys({
    listingId: objectId.required(),
  }),
});

export const validateCategory = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    slug: Joi.string().required(),
  }),
});

export const validatePagination = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(50).optional(),
    q: Joi.string().optional(),
    category: Joi.string().optional(),
  }),
});