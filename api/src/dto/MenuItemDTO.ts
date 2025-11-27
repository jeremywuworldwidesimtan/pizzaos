import {
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    Length,
} from "class-validator";

export class MenuItemDTO {
    @IsString({ message: "Name must be a string" })
    @Length(1, 100, { message: "Name must be between 1 and 100 characters" })
    name: string;

    @IsString({ message: "Description must be a string" })
    @IsOptional()
    description: string;

    @IsString({ message: "Category must be a string" })
    @Length(1, 50, { message: "Category must be between 1 and 50 characters" })
    category: string;

    @IsNumber({}, { message: "Price must be a number" })
    price: number;

    @IsBoolean({ message: "Availability must be a boolean" })
    is_active: boolean;
}
