import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumberValid } from '../../common/custom-class-validation/isPhoneNumber';
import { IsGenderValid } from '../../common/custom-class-validation/isGender';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty()
  @MaxLength(16, { message: 'Name must have maximum 16 characters.' })
  @MinLength(2, { message: 'Name must have minimum 2 characters.' })
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @MaxLength(16, { message: 'Surname must have maximum 16 characters.' })
  @MinLength(2, { message: 'Surname must have minimum 2 characters.' })
  @IsDefined()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumberValid({ message: 'Please enter a valid number' })
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  birthDate: Date;

  @Transform((gender) => (gender.value = gender.value.toUpperCase()))
  @IsGenderValid({ message: 'Please enter a valid gender.' })
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  gender: string;
}
