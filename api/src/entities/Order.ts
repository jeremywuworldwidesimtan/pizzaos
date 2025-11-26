import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./Customer";

@Entity({ name: "orders" })
export class Order {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => Customer, (customer) => customer.orders, {
        nullable: true,
        onDelete: "SET NULL",
    })
    customer: Customer | null;

    @Column({ nullable: true })
    customer_id: number | null; // keeps FK explicit

    // "dine-in", "takeout", "delivery", etc.
    @Column({ length: 30 })
    order_type: string;

    // "open", "pending", "completed", "canceled", etc.
    @Column({ length: 30 })
    status: string;

    @Column({ type: "timestamptz", default: () => "NOW()" })
    order_datetime: Date;

    @Column({ type: "numeric", precision: 10, scale: 2, default: 0 })
    subtotal_amount: number;

    @Column({ type: "numeric", precision: 10, scale: 2, default: 0 })
    tax_amount: number;

    @Column({ type: "numeric", precision: 10, scale: 2, default: 0 })
    total_amount: number;

    @Column({ type: "text", nullable: true })
    notes: string | null;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;

    // @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
    // items: OrderItem[];

    // @OneToMany(() => Payment, (payment) => payment.order)
    // payments: Payment[];

    // @OneToMany(
    //     () => InventoryAdjustment,
    //     (adjustment) => adjustment.related_order
    // )
    // inventory_adjustments: InventoryAdjustment[];
}
