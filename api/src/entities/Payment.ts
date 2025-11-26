import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    Index,
    JoinColumn,
} from "typeorm";
import { Order } from "./Order";

@Entity({ name: "payments" })
export class Payment {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => Order, (order) => order.payments, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "order_id" })
    order: Order;

    @Index()
    @Column()
    @JoinColumn({ name: "order_id" })
    order_id: number;

    @Column({ length: 30 })
    payment_method: string; // 'cash', 'card', 'online', ...

    @Column({ type: "numeric", precision: 10, scale: 2 })
    amount: number;

    @Column({ type: "timestamptz", default: () => "NOW()" })
    payment_datetime: Date;

    @Column({ length: 30 })
    status: string; // 'pending', 'completed', 'refunded'

    @Column({ length: 100, nullable: true })
    reference: string | null;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}
