import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class TakeBookDto {
  @IsOptional()
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @IsOptional()
  @ApiProperty()
  @MaxLength(72, { message: 'Book name must have maximum 72 characters.' })
  @IsDefined()
  @IsNotEmpty()
  bookName?: string;

  @IsOptional()
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  author?: string;

  @ApiProperty()
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  kind?: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  vol?: number;

  @ApiProperty()
  @IsDefined()
  @IsOptional()
  @IsNotEmpty()
  releaseDate?: Date;
}
