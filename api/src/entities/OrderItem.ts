import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Index,
    JoinColumn,
} from "typeorm";
import { Order } from "./Order";
import { MenuItem } from "./MenuItem";

@Entity({ name: "order_items" })
export class OrderItem {
    @PrimaryGeneratedColumn("increment")
    id: number;
    
    @ManyToOne(() => MenuItem, (menuItem) => menuItem.order_items)
    @JoinColumn({ name: "menu_item_id" })
    menu_item: MenuItem;

    @Index()
    @Column()
    @JoinColumn({ name: "menu_item_id" })
    menu_item_id: number;

    @ManyToOne(() => Order, (order) => order.items, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "order_id" })
    order: Order;

    @Index()
    @Column()
    @JoinColumn({ name: "order_id" })
    order_id: number;


    @Column({ type: "int" })
    quantity: number;

    @Column({ type: "numeric", precision: 10, scale: 2 })
    unit_price: number;

    @Column({ type: "numeric", precision: 10, scale: 2 })
    line_total: number;
}
