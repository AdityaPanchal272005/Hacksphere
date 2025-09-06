import mongoose from 'mongoose';
const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
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
          default: 1,
          min: 1,
          max: 10,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Cart', CartSchema);