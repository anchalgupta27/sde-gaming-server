"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const Cart_1 = require("../models/Cart");
const Product_1 = require("../models/Product");
class CartController {
    addProductsToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, productId, quantity, size, color, price, name } = req.body;
                // Find the product in the database to check stock
                const product = yield Product_1.Product.findById(productId);
                console.log(product);
                console.log(quantity);
                if (!product) {
                    return res.status(400).json({ success: false, message: "Product not found" });
                }
                // Check if there is enough stock
                if (product.stock < quantity) {
                    return res.status(400).json({ success: false, message: "Not enough stock" });
                }
                // Find the user's cart or create a new one
                let cart = yield Cart_1.Cart.findOne({ userId });
                if (!cart) {
                    // If no cart exists for the user, create a new one
                    cart = new Cart_1.Cart({ userId, products: [], totalAmount: 0 });
                }
                const existingProduct = cart.products.find((product) => product.productId.toString() === productId &&
                    product.size === size &&
                    product.color === color);
                if (existingProduct) {
                    existingProduct.quantity += quantity;
                }
                else {
                    cart.products.push({ productId, quantity, size, color, price, name });
                }
                // Recalculate the totalAmount
                cart.totalAmount = cart.products.reduce((total, product) => total + product.price * product.quantity, 0);
                // Reduce the stock of the product
                product.stock -= quantity;
                yield product.save();
                // Save the updated cart
                yield cart.save();
                // Return the updated cart
                res.status(200).json({ success: true, cart });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "Server error" });
            }
        });
    }
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                console.log(userId);
                const cart = yield Cart_1.Cart.findOne({ userId })
                    .populate("products.productId", "name price stock imageUrl color size")
                    .populate("userId", "name email");
                if (!cart) {
                    return res.status(404).json({ success: false, message: "Cart not found" });
                }
                res.status(200).json({ success: true, cart });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "Server error" });
            }
        });
    }
}
exports.CartController = CartController;
