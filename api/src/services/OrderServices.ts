import { AppDataSource } from "../config/database";
import { OrderDTO } from "../dto/OrderDTO";
import { Order } from "../entities/Order";

export type Status = "open" | "paid" | "cancelled" | "pending" | "completed";

export class OrderService {
    private OrderRepository = AppDataSource.getRepository(Order);

    // get orders
    async getAll(): Promise<Order[]> {
        return await this.OrderRepository.find();
    }

    // get order by id
    async getById(id: number): Promise<Order | null> {
        return await this.OrderRepository.findOneBy({ id });
    }

    // get order by customer id
    async getByCustomerId(customer_id: number): Promise<Order[]> {
        return await this.OrderRepository.findBy({ customer: { id: customer_id } });
    }

    // create order
    async create(orderDataDTO: Partial<OrderDTO>): Promise<Order> {
        const newOrder = this.OrderRepository.create(orderDataDTO);
        return await this.OrderRepository.save(newOrder);
    }

    // update order
    async update(
        id: number,
        orderDataDTO: Partial<OrderDTO>
    ): Promise<Order | null> {
        const order = await this.OrderRepository.findOneBy({ id });
        if (!order) {
            return null;
        }
        this.OrderRepository.merge(order, orderDataDTO);
        return await this.OrderRepository.save(order);
    }

    // update order status
    async updateStatus(id: number, status: Status): Promise<Order | null> {
        const order = await this.OrderRepository.findOneBy({ id });
        if (!order) {
            return null;
        }
        order.status = status;
        return await this.OrderRepository.save(order);
    }

    // delete order
    async delete(id: number): Promise<boolean> {
        const result = await this.OrderRepository.delete(id);
        return result.affected !== 0;
    }
}
