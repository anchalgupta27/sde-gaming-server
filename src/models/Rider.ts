import mongoose from 'mongoose';

const riderSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['assigned', 'picked-up', 'delivered'],
    default: 'assigned'
  },
  assignedAt: { type: Date, default: Date.now },
  deliveredAt: Date
}, { timestamps: true });

export default mongoose.models.Rider || mongoose.model('Rider', riderSchema);
