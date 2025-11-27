import { IsInt, IsNumber } from "class-validator";

export class OrderItemDTO {
    @IsInt({ message: "Menu item ID must be an integer" })
    menu_item_id: number;

    @IsInt({ message: "Order ID must be an integer" })
    order_id: number;

    @IsInt({ message: "Quantity must be an integer" })
    quantity: number;

    @IsNumber({}, { message: "Unit price must be a number" })
    unit_price: number;

    @IsNumber({}, { message: "Line total must be a number" })
    line_total: number;
}
