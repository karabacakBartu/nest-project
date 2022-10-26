import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class ReturnDateDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  returnDate: Date;
}
