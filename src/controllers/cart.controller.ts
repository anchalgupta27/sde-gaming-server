import { Request, Response } from "express";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";

export class CartController {
    public async addProductsToCart(req: Request, res: Response) {
        try {
            const { userId, productId, quantity, size, color, price, name } = req.body;
            // Find the product in the database to check stock
            const product = await Product.findById(productId);
            console.log(product)
            console.log(quantity)
            
            if (!product) {
                return res.status(400).json({ success: false, message: "Product not found" });
            }

            // Check if there is enough stock
            if (product.stock! < quantity) {
                return res.status(400).json({ success: false, message: "Not enough stock" });
            }

            // Find the user's cart or create a new one
            let cart = await Cart.findOne({ userId });

            if (!cart) {
                // If no cart exists for the user, create a new one
                cart = new Cart({ userId, products: [], totalAmount: 0 });
            }

            // Check if the product already exists in the cart
            const existingProduct = cart.products.find(
                (product) => product.productId.toString() === productId
            );

            if (existingProduct) {
                // If product exists, update the quantity
                existingProduct.quantity += quantity;
            } else {
                // If product doesn't exist, add a new product
                cart.products.push({ productId, quantity, size, color, price, name });
            }

            // Recalculate the totalAmount
            cart.totalAmount = cart.products.reduce(
                (total, product) => total + product.price! * product.quantity,
                0
            );

            // Reduce the stock of the product
            product.stock! -= quantity;
            await product.save();

            // Save the updated cart
            await cart.save();

            // Return the updated cart
            res.status(200).json({ success: true, cart });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }

    public async getCart(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const cart = await Cart.findOne({ userId })
                .populate("products.productId", "name price stock imageUrl") // customize fields as needed
                .populate("userId", "name email"); // optional if user details needed

            if (!cart) {
                return res.status(404).json({ success: false, message: "Cart not found" });
            }

            res.status(200).json({ success: true, cart });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
}


