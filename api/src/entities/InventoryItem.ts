import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    Index,
} from "typeorm";
import { InventoryAdjustment } from "./InventoryAdjustment";

@Entity({ name: "inventory_items" })
export class InventoryItem {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 150 })
    name: string;

    @Index({ unique: true })
    @Column({ length: 50, nullable: true })
    sku: string | null;

    @Column({ length: 20 })
    unit_of_measure: string; // 'g', 'ml', 'piece'

    @Column({ type: "numeric", precision: 12, scale: 3, default: 0 })
    stock_quantity: number;

    @Column({ type: "numeric", precision: 12, scale: 3, default: 0 })
    reorder_level: number;

    @Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
    default_cost: number | null;

    @Column({ type: "boolean", default: true })
    is_active: boolean;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;

    @OneToMany(
        () => InventoryAdjustment,
        (adjustment) => adjustment.inventory_item
    )
    adjustments: InventoryAdjustment[];
}
