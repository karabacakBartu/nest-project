import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';
import { IsPhoneNumberValid } from '../../common/custom-class-validation/isPhoneNumber';
import { Transform } from 'class-transformer';
import { IsGenderValid } from '../../common/custom-class-validation/isGender';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @MaxLength(16, { message: 'Name must have maximum 16 characters.' })
  @MinLength(2, { message: 'Name must have minimum 2 characters.' })
  name: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(16, { message: 'Surname must have maximum 16 characters.' })
  @MinLength(2, { message: 'Surname must have minimum 2 characters.' })
  surname: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsPhoneNumberValid({ message: 'Please enter a valid number' })
  @ApiProperty()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  birthDate: Date;

  @Transform((gender) => (gender.value = gender.value.toUpperCase()))
  @IsGenderValid({ message: 'Please enter a valid gender.' })
  @ApiProperty()
  @IsOptional()
  gender: string;
}
