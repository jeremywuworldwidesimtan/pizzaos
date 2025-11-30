import { IsEmail, IsString, IsOptional, IsIn, Length } from 'class-validator';
import { UserRole } from '../entities/User';

export class UserDTO {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @Length(1, 255, { message: 'Email must be between 1 and 255 characters' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @Length(6, 200, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsOptional()
  @IsIn(['admin', 'manager', 'staff'] as UserRole[], { message: 'Role must be admin, manager, or staff' })
  role?: UserRole;
}

export class changePasswordDTO {
  @IsString({ message: 'Old password must be a string' })
  @Length(6, 200, { message: 'Old password must be at least 6 characters' })
  old_password: string;

  @IsString({ message: 'New password must be a string' })
  @Length(6, 200, { message: 'New password must be at least 6 characters' })
  new_password: string;
}