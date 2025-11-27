import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from "typeorm";
import { OrderItem } from "./OrderItem";

@Entity({ name: "menu_items" })
export class MenuItem {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 150 })
    name: string;

    @Column({ type: "text", nullable: true })
    description: string | null;

    @Column({ length: 50 })
    category: string; // 'pizza', 'drink', etc.

    @Column({ type: "numeric", precision: 10, scale: 2 })
    price: number;

    @Column({ type: "boolean", default: true })
    is_active: boolean;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.menu_item)
    order_items: OrderItem[];
}
