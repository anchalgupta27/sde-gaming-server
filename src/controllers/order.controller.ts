import { Cart } from "../models/Cart";
import { Request, Response } from "express";
import { Order } from "../models/Order";
import { User } from "../models/User";

export class OrderController {
    public async checkoutCart(req: Request, res: Response) {
        try {
            const { userId } = req.body;
            console.log("order");

            // Find the user's cart
            const cart = await Cart.findOne({ userId });

            if (!cart || cart.products.length === 0) {
                return res.status(400).json({ success: false, message: "Cart is empty" });
            }

            // Create a new order from the cart, without assigning a rider initially
            const order = new Order({
                userId,
                products: cart.products,
                totalAmount: cart.totalAmount,
                status: 'pending',
                Address: "Jayanagar 4th block, Bangalore, India",
                rider: null // Rider is not assigned during checkout
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


    public async getAllOrders(req: Request, res: Response) {
        try {
            const orders = await Order.find();
            return res.status(200).json(orders);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Update order status
    public async updateOrderStatus(orderId: string, status: "pending" | "shipped" | "delivered") {
        try {
            // Find the order by ID
            const order = await Order.findById(orderId);

            if (!order) {
                throw new Error("Order not found");
            }

            // Update the order status
            order.status = status;
            await order.save();
            return order.status;
        } catch (error) {
            throw error;
        }
    }

    public async assignRider(orderId: string, status: string) {
        try {
           
           if(status === "shipped") {
            const riders = await User.find({ roles: 'rider' }, '_id name email');
            if (!riders || riders.length === 0) {
                throw new Error("No riders available");
            }
            const randomIndex = Math.floor(Math.random() * riders.length);
            const selectedRider = riders[randomIndex];
            const order = await Order.findById(orderId);

            if (!order) {
                throw new Error("Order not found");
            }
            order.rider = {
                riderId: selectedRider._id,
                status: 'assigned',
                name: selectedRider.name,
                assignedAt: new Date()
            };
            await order.save();
            return order;
           }

           if(status === "pending") {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error("Order not found");
            }
            order.rider = null;
            await order.save();
            return order;
           }
        } catch (error) {
            throw error;
        }
    }


    // New function that combines the functionality of updating order status and assigning rider
    public async updateOrderDetails(req: Request, res: Response) {
        try {
            const { orderId, status } = req.body;
            console.log(req.body)

            // Update order status if provided

                const orderStatus = await this.updateOrderStatus(orderId, status);
                const orderRider = await this.assignRider(orderId, status);
                if (!orderStatus) {
                    return res.status(404).json({ success: false, message: "Order not found" });
                }
                if (!orderRider) {
                    return res.status(404).json({ success: false, message: "Order not found" });
                }
            

          

            return res.status(200).json({ success: true, message: "Order updated successfully", order: {orderRider, orderStatus} });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }

    public async getRidersWithOrders(req: Request, res: Response) {
        try {
            // Fetch orders that have a rider assigned
            const ordersWithRiders = await Order.find({ "rider.riderId": { $ne: null } })
                .populate("rider.riderId", "name email") // populate name and email from User model
                .lean();

            // Group orders by riderId
            const riderMap: Record<string, { riderInfo: any, orders: any[] }> = {};

            for (const order of ordersWithRiders) {
                const riderId = order.rider?.riderId?._id?.toString();
                if (!riderId) continue;

                if (!riderMap[riderId]) {
                    riderMap[riderId] = {
                        riderInfo: order?.rider?.riderId,
                        orders: []
                    };
                }

                riderMap[riderId].orders.push(order);
            }

            // Convert map to array
            const result = Object.entries(riderMap).map(([riderId, data]) => ({
                riderId,
                rider: data.riderInfo,
                assignedOrders: data.orders
            }));

            return res.status(200).json({ success: true, riders: result });
        } catch (error) {
            console.error("Error fetching riders with orders:", error);
            return res.status(500).json({ success: false, message: "Server error" });
        }
    }


    public async getOrderById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const order = await Order.findById(id);
            return res.status(200).json(order)
        } catch (error) {
            return res.status(500).send(error);
        }
    }

}
