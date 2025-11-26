import { AppDataSource } from "../config/database";
import { PaymentDTO } from "../dto/PaymentDTO";
import { Payment } from "../entities/Payment";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export class PaymentService {
    private PaymentRepository = AppDataSource.getRepository(Payment);

    // get payments
    async getAll(): Promise<Payment[]> {
        return await this.PaymentRepository.find();
    }

    // get payment by id
    async getById(id: number): Promise<Payment | null> {
        return await this.PaymentRepository.findOneBy({ id });
    }

    // get payment by order id
    async getByOrderId(order_id: number): Promise<Payment[]> {
        return await this.PaymentRepository.findBy({ order: { id: order_id } });
    }

    // get payment by status
    async getByStatus(status: PaymentStatus): Promise<Payment[]> {
        return await this.PaymentRepository.findBy({ status });
    }

    // create payment
    async create(paymentDataDTO: Partial<PaymentDTO>): Promise<Payment> {
        const newPayment = this.PaymentRepository.create(paymentDataDTO);
        return await this.PaymentRepository.save(newPayment);
    }

    // update payment
    async update(
        id: number,
        paymentDataDTO: Partial<PaymentDTO>
    ): Promise<Payment | null> {
        const payment = await this.PaymentRepository.findOneBy({ id });
        if (!payment) {
            return null;
        }
        this.PaymentRepository.merge(payment, paymentDataDTO);
        return await this.PaymentRepository.save(payment);
    }

    // update payment status
    async updateStatus(
        id: number,
        status: PaymentStatus
    ): Promise<Payment | null> {
        const payment = await this.PaymentRepository.findOneBy({ id });
        if (!payment) {
            return null;
        }
        payment.status = status;
        return await this.PaymentRepository.save(payment);
    }

    // delete payment
    async delete(id: number): Promise<boolean> {
        const result = await this.PaymentRepository.delete(id);
        return result.affected !== 0;
    }
}
