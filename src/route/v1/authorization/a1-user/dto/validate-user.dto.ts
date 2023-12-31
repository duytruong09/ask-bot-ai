import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ValidateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(9)
  @MaxLength(15)
  phone?: string;

  @IsOptional()
  @IsString()
  socialKey?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  userName?: string;
}
