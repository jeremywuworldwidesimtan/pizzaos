import { Request, Response } from "express";
import { OrderItemService } from "../services/OrderItemServices";
import { OrderItemDTO } from "../dto/OrderItemDTO";

const OrderItemServiceInstance = new OrderItemService();

// GET orderitem/
export const getOrderItems = async (req: Request, res: Response) => {
    try {
        const orderItems = await OrderItemServiceInstance.getAll();
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// GET orderitem/:id
export const getOrderItemById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const orderItem = await OrderItemServiceInstance.getById(id);
        if (orderItem) {
            res.status(200).json(orderItem);
        } else {
            res.status(404).json({ message: "Order item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// GET orderitem/order/:order_id
export const getOrderItemsByOrderId = async (req: Request, res: Response) => {
    try {
        const order_id = parseInt(req.params.order_id, 10);
        const orderItems = await OrderItemServiceInstance.getByOrderId(order_id);
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// GET orderitem/menuitem/:menu_item_id
export const getOrderItemsByMenuItemId = async (req: Request, res: Response) => {
    try {
        const menu_item_id = parseInt(req.params.menu_item_id, 10);
        const orderItems = await OrderItemServiceInstance.getByMenuItemId(menu_item_id);
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// POST orderitem/
export const createOrderItem = async (req: Request, res: Response) => {
    try {
        const orderItemData: Partial<OrderItemDTO> = req.body;
        const newOrderItem = await OrderItemServiceInstance.create(orderItemData);
        res.status(201).json(newOrderItem);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// PUT orderitem/:id
export const updateOrderItem = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const orderItemData: Partial<OrderItemDTO> = req.body;
        const updatedOrderItem = await OrderItemServiceInstance.update(id, orderItemData);
        if (updatedOrderItem) {
            res.status(200).json(updatedOrderItem);
        } else {
            res.status(404).json({ message: "Order item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// DELETE orderitem/:id
export const deleteOrderItem = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const success = await OrderItemServiceInstance.delete(id);
        if (!success) {
            res.status(404).json({ message: "Order item not found" });
        } else {
            res.status(200).json({ message: "Order item deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};