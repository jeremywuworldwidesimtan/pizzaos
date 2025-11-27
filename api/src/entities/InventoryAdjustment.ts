import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    Index,
    JoinColumn,
} from "typeorm";
import { InventoryItem } from "./InventoryItem";
import { Order } from "./Order";

@Entity({ name: "inventory_adjustments" })
export class InventoryAdjustment {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => InventoryItem, (item) => item.adjustments, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "inventory_item_id" })
    inventory_item: InventoryItem;

    @Index()
    @Column()
    @JoinColumn({ name: "inventory_item_id" })
    inventory_item_id: number;

    @Column({ type: "numeric", precision: 12, scale: 3 })
    change_amount: number

    @Column({ length: 50 })
    reason: string; // 'purchase', 'usage', 'waste', 'manual'

    @Index()
    @Column({ nullable: true })
    related_order_id: number | null;

    @ManyToOne(() => Order, (order) => order.inventory_adjustments, {
        nullable: true,
        onDelete: "SET NULL",
    })
    related_order: Order | null;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;

    @Column({ type: "text", nullable: true })
    notes: string | null;
}
