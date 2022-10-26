import { Types } from 'mongoose';
import { IsDefined, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RebateBookDto {
  @IsDefined()
  @ApiProperty()
  @IsNotEmpty()
  bookId: Types.ObjectId;

  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  bookName: string;

  @ApiProperty()
  @IsOptional()
  vol?: string;
}
