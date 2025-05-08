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
exports.OrderController = void 0;
const Cart_1 = require("../models/Cart");
const Order_1 = require("../models/Order");
class OrderController {
    checkoutCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                console.log("order");
                // Find the user's cart
                const cart = yield Cart_1.Cart.findOne({ userId });
                if (!cart || cart.products.length === 0) {
                    return res.status(400).json({ success: false, message: "Cart is empty" });
                }
                // Create a new order from the cart
                const order = new Order_1.Order({
                    userId,
                    products: cart.products,
                    totalAmount: cart.totalAmount,
                    status: 'pending',
                    Address: "Jayanagar 4th block, Bangalore, India"
                });
                yield order.save();
                // Clear the cart
                cart.products.splice(0, cart.products.length);
                cart.totalAmount = 0;
                yield cart.save();
                res.status(200).json({ success: true, message: "Checkout successful", order });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "Server error" });
            }
        });
    }
    getAllOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield Order_1.Order.find();
                return res.status(200).json(orders);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.OrderController = OrderController;
