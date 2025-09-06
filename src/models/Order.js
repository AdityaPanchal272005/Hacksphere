import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    items: [
      {
        listingId: {
          type: Schema.Types.ObjectId,
          ref: 'Listing',
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        imageUrl: {
          type: String,
        },
        qty: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['placed', 'cancelled'],
      default: 'placed',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', OrderSchema);