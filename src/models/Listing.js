import mongoose from 'mongoose';
const { Schema } = mongoose;

const ListingSchema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// ListingSchema.index({ title: 'text', description: 'text' });
// ListingSchema.index({ category: 1, createdAt: -1 });
// ListingSchema.index({ sellerId: 1 });

export default mongoose.model('Listing', ListingSchema);