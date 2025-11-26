import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm"
import { Order } from "./Order";

@Entity({name: "customers"})
export class Customer {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length: 100})
    first_name: string

    @Column({length: 100})
    last_name: string

    @Column({ length: 20, nullable: true })
    phone: string | null;

    @Column({ length: 255, nullable: true, unique: true })
    email: string | null;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @OneToMany(() => Order, order => order.customer)
    orders: Order[];
}
