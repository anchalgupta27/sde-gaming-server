import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  size: [String], 
  color: [String], 
  imageUrl: String
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', productSchema);
