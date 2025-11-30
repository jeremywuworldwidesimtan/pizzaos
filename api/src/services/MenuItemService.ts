import { AppDataSource } from "../config/database";
import { MenuItem } from "../entities/MenuItem";
import { MenuItemDTO } from "../dto/MenuItemDTO";

export class MenuItemService {
    private MenuItemRepository = AppDataSource.getRepository(MenuItem);

    // get all menu items
    async getAll(): Promise<MenuItem[]> {
        return await this.MenuItemRepository.find();
    }

    // get menu items by id
    async getById(id: number): Promise<MenuItem | null> {
        return await this.MenuItemRepository.findOneBy({ id });
    }

    // get menu items by category
    async getByCategory(category: string): Promise<MenuItem[]> {
        return await this.MenuItemRepository.findBy({ category });
    }

    // create menu item
    async create(menuItemDataDTO: Partial<MenuItemDTO>): Promise<MenuItem> {
        const newMenuItem = this.MenuItemRepository.create(menuItemDataDTO);
        return await this.MenuItemRepository.save(newMenuItem);
    }

    // update menu item
    async update(
        id: number,
        menuItemDataDTO: Partial<MenuItemDTO>
    ): Promise<MenuItem | null> {
        const menuItem = await this.MenuItemRepository.findOneBy({ id });
        if (!menuItem) {
            return null;
        }
        this.MenuItemRepository.merge(menuItem, menuItemDataDTO);
        return await this.MenuItemRepository.save(menuItem);
    }

    // delete menu item
    async delete(id: number): Promise<boolean> {
        const result = await this.MenuItemRepository.delete(id);
        return result.affected !== 0;
    }
}
