import { AppDataSource } from "../config/database";
import { InventoryItem } from "../entities/InventoryItem";
import { InventoryItemDTO } from "../dto/InventoryItemDTO";

export class InventoryItemService {
    private InventoryItemRepository =
        AppDataSource.getRepository(InventoryItem);

    // get all inventory items
    async getAll(): Promise<InventoryItem[]> {
        return await this.InventoryItemRepository.find();
    }

    // get inventory item by id
    async getById(id: number): Promise<InventoryItem | null> {
        return await this.InventoryItemRepository.findOneBy({ id });
    }

    // get inventory item by sku
    async getBySku(sku: string): Promise<InventoryItem | null> {
        return await this.InventoryItemRepository.findOneBy({ sku });
    }

    // create inventory item
    async create(
        inventoryItemDataDTO: Partial<InventoryItemDTO>
    ): Promise<InventoryItem> {
        const newInventoryItem =
            this.InventoryItemRepository.create(inventoryItemDataDTO);
        return await this.InventoryItemRepository.save(newInventoryItem);
    }

    // update inventory item
    async update(
        id: number,
        inventoryItemDataDTO: Partial<InventoryItemDTO>
    ): Promise<InventoryItem | null> {
        const inventoryItem = await this.InventoryItemRepository.findOneBy({
            id,
        });
        if (!inventoryItem) {
            return null;
        }
        this.InventoryItemRepository.merge(inventoryItem, inventoryItemDataDTO);
        return await this.InventoryItemRepository.save(inventoryItem);
    }

    // delete inventory item
    async delete(id: number): Promise<boolean> {
        const result = await this.InventoryItemRepository.delete(id);
        return result.affected !== 0;
    }
}
