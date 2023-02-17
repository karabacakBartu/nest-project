import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumberValid } from '../../common/custom-class-validation/isPhoneNumber';
import { Transform } from 'class-transformer';
import { IsGenderValid } from '../../common/custom-class-validation/isGender';
import { Match } from '../../common/custom-class-validation/isMatch';

export class RegisterDto {
  @IsEmail()
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  // @IsDefined()
  // @IsNotEmpty()
  // @ApiProperty()
  // @Match('password')
  // rePassword: string;
}
