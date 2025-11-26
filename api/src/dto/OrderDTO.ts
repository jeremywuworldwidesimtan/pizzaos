import { IsDate, IsInt, IsNumber, IsOptional, IsString, Length } from "class-validator";


export class OrderDTO {
    @IsInt({ message: "Customer ID must be an integer" })
    customer_id: number;

    @IsString({ message: "Order type must be a string" })
    @Length(1, 30, { message: "Order type must be between 1 and 30 characters" })
    order_type: string;

    @IsString({ message: "Status must be a string" })
    @Length(1, 30, { message: "Status must be between 1 and 30 characters" })
    status: string;

    @IsNumber({}, { message: "Subtotal amount must be a number" })
    subtotal_amount: number;

    @IsNumber({}, { message: "Tax amount must be a number" })
    tax_amount: number;

    @IsNumber({}, { message: "Total amount must be a number" })
    total_amount: number;

    @IsString({ message: "Notes must be a string" })
    @IsOptional()
    notes: string;
}