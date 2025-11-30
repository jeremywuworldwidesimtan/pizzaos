import { AppDataSource } from "../config/database";
import { OrderItem } from "../entities/OrderItem";
import { OrderItemDTO } from "../dto/OrderItemDTO";

export class OrderItemService {
    private OrderItemRepository = AppDataSource.getRepository(OrderItem);

    // get all order items
    async getAll(): Promise<OrderItem[]> {
        return await this.OrderItemRepository.find();
    }

    // get order item by id
    async getById(id: number): Promise<OrderItem | null> {
        return await this.OrderItemRepository.findOneBy({ id });
    }

    // get order item by order id
    async getByOrderId(order_id: number): Promise<OrderItem[]> {
        return await this.OrderItemRepository.findBy({ order_id });
    }

    // get order item by menu item id
    async getByMenuItemId(menu_item_id: number): Promise<OrderItem[]> {
        return await this.OrderItemRepository.findBy({ menu_item_id });
    }

    // create order item
    async create(
        orderItemDataDTO: Partial<OrderItemDTO>
    ): Promise<OrderItem> {
        const newOrderItem = this.OrderItemRepository.create(orderItemDataDTO);
        return await this.OrderItemRepository.save(newOrderItem);
    }

    // update order item
    async update(
        id: number,
        orderItemDataDTO: Partial<OrderItemDTO>
    ): Promise<OrderItem | null> {
        const orderItem = await this.OrderItemRepository.findOneBy({ id });
        if (!orderItem) {
            return null;
        }
        this.OrderItemRepository.merge(orderItem, orderItemDataDTO);
        return await this.OrderItemRepository.save(orderItem);
    }

    // delete order item
    async delete(id: number): Promise<boolean> {
        const result = await this.OrderItemRepository.delete(id);
        return result.affected !== 0;
    }
}