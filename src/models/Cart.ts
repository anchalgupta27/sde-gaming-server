import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    totalAmount: Number,
    products: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
            quantity: {type: Number, required: true},
            size: String,
            color: String,
            price: Number
        }
    ]
}, {timestamps: true});

export const Cart = mongoose.model('Cart', cartSchema);