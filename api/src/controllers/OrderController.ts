import { Request, Response } from "express";
import { OrderService } from "../services/OrderServices";
import { OrderDTO } from "../dto/OrderDTO";

const OrderServiceInstance = new OrderService();

// GET order/
export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await OrderServiceInstance.getAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
        });
    }
};

// GET order/:id
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const order = await OrderServiceInstance.getById(id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
        });
    }
};

// GET order/customer/:customer_id
export const getOrdersByCustomerId = async (req: Request, res: Response) => {
    try {
        const customerId = parseInt(req.params.customer_id);
        if (isNaN(customerId)) {
            res.status(400).json({ message: "Invalid customer ID" });
            return;
        }
        const orders = await OrderServiceInstance.getByCustomerId(customerId);
        if (orders.length > 0) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ message: "No orders found for this customer" });
        }
    } catch (error) {
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
        });
    }
};

// POST order/
export const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData: OrderDTO = req.body;
        const newOrder = await OrderServiceInstance.create(orderData);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
        });
    }
};

// PUT order/:id
export const updateOrder = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const orderData: Partial<OrderDTO> = req.body;
        const updatedOrder = await OrderServiceInstance.update(id, orderData);
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
        });
    }
};

// PUT order/:id/status
export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { status } = req.body;
        const updatedOrder = await OrderServiceInstance.updateStatus(id, status);
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
        });
    }
};

// DELETE order/:id
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const success = await OrderServiceInstance.delete(id);
        if (!success) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
        });
    }
};