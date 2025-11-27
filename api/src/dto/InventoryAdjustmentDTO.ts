import { IsInt, IsNumber, IsString, Length } from "class-validator";

export class InventoryAdjustmentDTO {
    @IsInt({ message: "Inventory Item ID must be an integer" })
    inventory_item_id: number;

    @IsNumber({}, { message: "Change amount must be a number" })
    change_amount: number;

    @IsString({ message: "Reason must be a string" })
    @Length(1, 50, { message: "Reason must be between 1 and 50 characters" })
    reason: string;

    @IsInt({ message: "Related Order ID must be an integer" })
    related_order_id: number;

    @IsString({ message: "Notes must be a string" })
    notes: string;
}
