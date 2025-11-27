import {
    IsBoolean,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    Length,
} from "class-validator";

export class InventoryItemDTO {
    @IsInt({ message: "ID must be an integer" })
    id: number;

    @IsString({ message: "Name must be a string" })
    @Length(1, 150, { message: "Name must be between 1 and 150 characters" })
    name: string;

    @IsString({ message: "SKU must be a string" })
    @Length(1, 50, { message: "SKU must be between 1 and 50 characters" })
    sku: string;

    @IsString({ message: "Unit of measure must be a string" })
    @Length(1, 20, {
        message: "Unit of measure must be between 1 and 20 characters",
    })
    unit_of_measure: string;

    @IsNumber({}, { message: "Stock quantity must be a number" })
    stock_quantity: number;

    @IsNumber({}, { message: "Reorder level must be a number" })
    reorder_level: number;

    @IsNumber({}, { message: "Default cost must be a number" })
    @IsOptional()
    default_cost: number;

    @IsBoolean({ message: "Active status must be a boolean" })
    is_active: boolean;
}
