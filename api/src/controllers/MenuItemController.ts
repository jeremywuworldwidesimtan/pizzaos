import { Request, Response } from "express";
import { MenuItemService } from "../services/MenuItemService";
import { MenuItemDTO } from "../dto/MenuItemDTO";

const MenuItemServiceInstance = new MenuItemService();

// GET menuitem/
export const getMenuItems = async (req: Request, res: Response) => {
    try {
        const menuItems = await MenuItemServiceInstance.getAll();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

// GET menuitem/:id
export const getMenuItemById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const menuItem = await MenuItemServiceInstance.getById(id);
        if (menuItem) {
            res.status(200).json(menuItem);
        } else {
            res.status(404).json({ message: "Menu item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

// GET menuitem/category/:category
export const getMenuItemsByCategory = async (req: Request, res: Response) => {
    try {
        const category = req.params.category;
        const menuItems = await MenuItemServiceInstance.getByCategory(category);
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// POST menuitem/
export const createMenuItem = async (req: Request, res: Response) => {
    try {
        const menuItemData: Partial<MenuItemDTO> = req.body;
        const newMenuItem = await MenuItemServiceInstance.create(menuItemData);
        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// PUT menuitem/:id
export const updateMenuItem = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const menuItemData: Partial<MenuItemDTO> = req.body;
        const updatedMenuItem = await MenuItemServiceInstance.update(id, menuItemData);
        if (updatedMenuItem) {
            res.status(200).json(updatedMenuItem);
        } else {
            res.status(404).json({ message: "Menu item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// DELETE menuitem/:id
export const deleteMenuItem = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const success = await MenuItemServiceInstance.delete(id);
        if (!success) {
            res.status(404).json({ message: "Menu item not found" });
        } else {
            res.status(200).json({ message: "Menu item deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};