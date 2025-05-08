import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalAmount: Number,
  Address: String,
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      size: String,
      color: String,
      price: Number
    }
  ],
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },

  // New: Rider info embedded directly
  rider: {
    riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['assigned', 'picked-up', 'delivered'],
      default: 'assigned'
    },
    assignedAt: Date,
    deliveredAt: Date
  }

}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
