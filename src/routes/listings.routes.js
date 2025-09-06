import { Router } from 'express';
import {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getMyListings,
} from '../controllers/listings.controller.js';
import { requireAuth, requireOwner } from '../middleware/auth.js';
import { validateListing, validatePagination } from '../middleware/validate.js';
import Listing from '../models/Listing.js';

const router = Router();

router.get('/', validatePagination, getListings);
router.get('/:id', getListingById);
router.post('/', requireAuth, validateListing, createListing);
router.get('/user', requireAuth, validatePagination, getMyListings);
router.put('/:id', requireAuth, requireOwner(Listing), validateListing, updateListing);
router.delete('/:id', requireAuth, requireOwner(Listing), deleteListing);

export default router;