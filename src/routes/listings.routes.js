// src/routes/listings.routes.js

import { Router } from 'express';
import {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getMyListings, // Make sure to import the new function
} from '../controllers/listings.controller.js';
import { requireAuth, requireOwner } from '../middleware/auth.js';
import { validateListing, validatePagination } from '../middleware/validate.js';
import Listing from '../models/Listing.js';

const router = Router();

// This route will now fetch all listings for the authenticated user
router.get('/my-listings', requireAuth, validatePagination, getMyListings);

router.get('/', validatePagination, getListings);
router.get('/:id', getListingById);
router.post('/', requireAuth, validateListing, createListing);
router.put('/:id', requireAuth, requireOwner(Listing), validateListing, updateListing);
router.delete('/:id', requireAuth, requireOwner(Listing), deleteListing);

export default router;