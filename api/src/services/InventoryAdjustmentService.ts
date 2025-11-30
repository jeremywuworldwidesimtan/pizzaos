import { AppDataSource } from "../config/database";
import { InventoryAdjustment } from "../entities/InventoryAdjustment";
import { InventoryAdjustmentDTO } from "../dto/InventoryAdjustmentDTO";

export class InventoryAdjustmentService {
    private InventoryAdjustmentRepository = AppDataSource.getRepository(InventoryAdjustment);

    // get all inventory adjustments
    async getAll(): Promise<InventoryAdjustment[]> {
        return await this.InventoryAdjustmentRepository.find();
    }

    // get inventory adjustment by id
    async getById(id: number): Promise<InventoryAdjustment | null> {
        return await this.InventoryAdjustmentRepository.findOneBy({ id });
    }

    // get inventory adjustments by inventory item id
    async getByInventoryItemId(inventory_item_id: number): Promise<InventoryAdjustment[]> {
        return await this.InventoryAdjustmentRepository.findBy({ inventory_item_id });
    }

    // get inventory adjustments by related order id
    async getByRelatedOrderId(related_order_id: number): Promise<InventoryAdjustment[]> {
        return await this.InventoryAdjustmentRepository.findBy({ related_order_id });
    }

    // create inventory adjustment
    async create(
        inventoryAdjustmentDataDTO: Partial<InventoryAdjustmentDTO>
    ): Promise<InventoryAdjustment> {
        const newInventoryAdjustment = this.InventoryAdjustmentRepository.create(inventoryAdjustmentDataDTO);
        return await this.InventoryAdjustmentRepository.save(newInventoryAdjustment);
    }

    // update inventory adjustment
    async update(
        id: number,
        inventoryAdjustmentDataDTO: Partial<InventoryAdjustmentDTO>
    ): Promise<InventoryAdjustment | null> {
        const inventoryAdjustment = await this.InventoryAdjustmentRepository.findOneBy({ id });
        if (!inventoryAdjustment) {
            return null;
        }
        this.InventoryAdjustmentRepository.merge(inventoryAdjustment, inventoryAdjustmentDataDTO);
        return await this.InventoryAdjustmentRepository.save(inventoryAdjustment);
    }

    // delete inventory adjustment
    async delete(id: number): Promise<boolean> {
        const result = await this.InventoryAdjustmentRepository.delete(id);
        return result.affected !== 0;
    }
}