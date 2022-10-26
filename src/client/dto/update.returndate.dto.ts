import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateReturndateDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  returnDate: Date;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  bookId: Types.ObjectId;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  bookName: string;
}
