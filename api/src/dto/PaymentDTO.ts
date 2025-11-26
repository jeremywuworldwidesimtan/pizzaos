import { IsInt, IsString, Length, IsNumber, IsOptional } from "class-validator";

export class PaymentDTO {
    @IsInt({ message: "Order ID must be an integer" })
    order_id: number;

    @IsString({ message: "Payment method must be a string" })
    @Length(1, 30, { message: "Payment method must be between 1 and 30 characters" })
    payment_method: string;

    @IsNumber({}, { message: "Amount must be a number" })
    amount: number;

    @IsString({ message: "Status must be a string" })
    @Length(1, 30, { message: "Status must be between 1 and 30 characters" })
    status: string;

    @IsString({ message: "Reference must be a string" })
    @IsOptional()
    @Length(1, 100, { message: "Reference must be between 1 and 100 characters" })
    reference: string;
}