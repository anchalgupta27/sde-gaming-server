import { Cart } from "../models/Cart";
import { Request, Response } from "express";
import { Order } from "../models/Order";

export class OrderController {
    public async checkoutCart(req: Request, res: Response) {
        try {
            const { userId } = req.body;
            console.log("order")
    
            // Find the user's cart
            const cart = await Cart.findOne({ userId });
    
            if (!cart || cart.products.length === 0) {
                return res.status(400).json({ success: false, message: "Cart is empty" });
            }
    
            // Create a new order from the cart
            const order = new Order({
                userId,
                products: cart.products,
                totalAmount: cart.totalAmount,
                status: 'pending' 
            });
    
            await order.save();
    
            // Clear the cart
            cart.products.splice(0, cart.products.length);
            cart.totalAmount = 0;
            await cart.save();
    
            res.status(200).json({ success: true, message: "Checkout successful", order });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
    
}