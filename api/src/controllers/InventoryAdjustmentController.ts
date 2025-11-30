import { Request, Response } from "express";
import { InventoryAdjustmentService } from "../services/InventoryAdjustmentService";
import { InventoryAdjustmentDTO } from "../dto/InventoryAdjustmentDTO";

const InventoryAdjustmentServiceInstance = new InventoryAdjustmentService();

// GET inventoryadjustment/
export const getInventoryAdjustments = async (req: Request, res: Response) => {
    try {
        const inventoryAdjustments = await InventoryAdjustmentServiceInstance.getAll();
        res.status(200).json(inventoryAdjustments);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// GET inventoryadjustment/:id
export const getInventoryAdjustmentById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const inventoryAdjustment = await InventoryAdjustmentServiceInstance.getById(id);
        if (inventoryAdjustment) {
            res.status(200).json(inventoryAdjustment);
        } else {
            res.status(404).json({ message: "Inventory adjustment not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// GET inventoryadjustment/inventoryitem/:inventory_item_id
export const getInventoryAdjustmentsByInventoryItemId = async (req: Request, res: Response) => {
    try {
        const inventory_item_id = parseInt(req.params.inventory_item_id, 10);
        const inventoryAdjustments = await InventoryAdjustmentServiceInstance.getByInventoryItemId(inventory_item_id);
        res.status(200).json(inventoryAdjustments);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// GET inventoryadjustment/relatedorder/:related_order_id
export const getInventoryAdjustmentsByRelatedOrderId = async (req: Request, res: Response) => {
    try {
        const related_order_id = parseInt(req.params.related_order_id, 10);
        const inventoryAdjustments = await InventoryAdjustmentServiceInstance.getByRelatedOrderId(related_order_id);
        res.status(200).json(inventoryAdjustments);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// POST inventoryadjustment/
export const createInventoryAdjustment = async (req: Request, res: Response) => {
    try {
        const inventoryAdjustmentData: Partial<InventoryAdjustmentDTO> = req.body;
        const newInventoryAdjustment = await InventoryAdjustmentServiceInstance.create(inventoryAdjustmentData);
        res.status(201).json(newInventoryAdjustment);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// PUT inventoryadjustment/:id
export const updateInventoryAdjustment = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const inventoryAdjustmentData: Partial<InventoryAdjustmentDTO> = req.body;
        const updatedInventoryAdjustment = await InventoryAdjustmentServiceInstance.update(id, inventoryAdjustmentData);
        if (updatedInventoryAdjustment) {
            res.status(200).json(updatedInventoryAdjustment);
        } else {
            res.status(404).json({ message: "Inventory adjustment not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// DELETE inventoryadjustment/:id
export const deleteInventoryAdjustment = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const success = await InventoryAdjustmentServiceInstance.delete(id);
        if (!success) {
            res.status(404).json({ message: "Inventory adjustment not found" });
        } else {
            res.status(200).json({ message: "Inventory adjustment deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};