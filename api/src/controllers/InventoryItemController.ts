import { Request, Response } from "express";
import { InventoryItemService } from "../services/InventoryItemSerivce";
import { InventoryItemDTO } from "../dto/InventoryItemDTO";

const InventoryItemServiceInstance = new InventoryItemService();

// GET inventoryitem/
export const getInventoryItems = async (req: Request, res: Response) => {
    try {
        const inventoryItems = await InventoryItemServiceInstance.getAll();
        res.status(200).json(inventoryItems);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// GET inventoryitem/:id
export const getInventoryItemById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const inventoryItem = await InventoryItemServiceInstance.getById(id);
        if (inventoryItem) {
            res.status(200).json(inventoryItem);
        } else {
            res.status(404).json({ message: "Inventory item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// GET inventoryitem/sku/:sku
export const getInventoryItemBySku = async (req: Request, res: Response) => {
    try {
        const sku = req.params.sku;
        const inventoryItem = await InventoryItemServiceInstance.getBySku(sku);
        if (inventoryItem) {
            res.status(200).json(inventoryItem);
        } else {
            res.status(404).json({ message: "Inventory item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// POST inventoryitem/
export const createInventoryItem = async (req: Request, res: Response) => {
    try {
        const inventoryItemData: Partial<InventoryItemDTO> = req.body;
        const newInventoryItem = await InventoryItemServiceInstance.create(inventoryItemData);
        res.status(201).json(newInventoryItem);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// PUT inventoryitem/:id
export const updateInventoryItem = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const inventoryItemData: Partial<InventoryItemDTO> = req.body;
        const updatedInventoryItem = await InventoryItemServiceInstance.update(id, inventoryItemData);
        if (updatedInventoryItem) {
            res.status(200).json(updatedInventoryItem);
        } else {
            res.status(404).json({ message: "Inventory item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// DELETE inventoryitem/:id
export const deleteInventoryItem = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const success = await InventoryItemServiceInstance.delete(id);
        if (!success) {
            res.status(404).json({ message: "Inventory item not found" });
        } else {
            res.status(200).json({ message: "Inventory item deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

