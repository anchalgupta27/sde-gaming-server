import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  size: [String], 
  color: [String], 
  stock: Number,
  imageUrl: String
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
