import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsDefined()
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  surname?: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDefined()
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDefined()
  birthDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsDefined()
  gender: string;
}
