"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    totalAmount: Number,
    products: [
        {
            productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
            size: String,
            color: String,
            price: Number
        }
    ]
}, { timestamps: true });
exports.Cart = mongoose_1.default.model('Cart', cartSchema);
