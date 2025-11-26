// define customer DTO for validation - DTO is used where a specific data shape is required

import { IsString, IsEmail, IsOptional, Length } from "class-validator"

export class CustomerDTO {
    @IsString({ message: "First name must be a string" })
    @Length(1, 100, { message: "First name must be between 1 and 100 characters" })
    first_name: string;

    @IsString({ message: "Last name must be a string" })
    @Length(1, 100, { message: "Last name must be between 1 and 100 characters" })
    last_name: string;

    @IsString({ message: "Phone must be a string" })
    @IsOptional()
    phone: string;

    @IsEmail({}, { message: "Email must be a valid email address" })
    @IsOptional()
    @Length(1, 255, { message: "Email must be between 1 and 255 characters" })
    email: string;
}