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

export class AuthDto {
  @ApiProperty()
  @MaxLength(16, { message: 'Name must have maximum 16 characters.' })
  @MinLength(2, { message: 'Name must have minimum 2 characters.' })
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @MaxLength(16, { message: 'Name must have maximum 16 characters.' })
  @MinLength(2, { message: 'Name must have minimum 2 characters.' })
  @IsDefined()
  @IsNotEmpty()
  password: string;
}
