import Listing from '../models/Listing.js';
import { NotFoundError, ForbiddenError } from '../middleware/errors.js';

// Add this function to get a user's own listings
export const getMyListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ sellerId: req.user.id }).populate('sellerId', 'username email');
    res.json(listings);
  } catch (err) {
    next(err);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({}).populate('sellerId', 'username email');
    res.json(listings);
  } catch (err) {
    next(err);
  }
};

export const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('sellerId', 'username email');
    if (!listing) {
      return next(new NotFoundError('Listing not found.'));
    }
    res.json(listing);
  } catch (err) {
    next(err);
  }
};

export const createListing = async (req, res, next) => {
  const { title, description, category, price, imageUrl } = req.body;
  try {
    const newListing = new Listing({
      sellerId: req.user.id,
      title,
      description,
      category,
      price,
      imageUrl,
    });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    next(err);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(new NotFoundError('Listing not found.'));
    }
    // Check if the authenticated user is the owner of the listing
    if (listing.sellerId.toString() !== req.user.id.toString()) {
      return next(new ForbiddenError('You do not have permission to update this listing.'));
    }
    Object.assign(listing, req.body);
    await listing.save();
    res.json(listing);
  } catch (err) {
    next(err);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(new NotFoundError('Listing not found.'));
    }
    // Check if the authenticated user is the owner of the listing
    if (listing.sellerId.toString() !== req.user.id.toString()) {
      return next(new ForbiddenError('You do not have permission to delete this listing.'));
    }
    await listing.deleteOne();
    res.json({ message: 'Listing removed.' });
  } catch (err) {
    next(err);
  }
};
