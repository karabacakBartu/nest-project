import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateBookDto {
  @ApiProperty()
  @MaxLength(72, { message: 'Book name must have maximum 72 characters.' })
  @IsOptional()
  bookName: string;

  @ApiProperty()
  @IsOptional()
  author: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  kind: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vol: number;

  @ApiProperty()
  @IsOptional()
  releaseDate: Date;

  @ApiProperty()
  @IsOptional()
  @Transform((shelf) => (shelf.value = shelf.value.shelfCategory.toUpperCase()))
  shelf: IShelf;
}

interface IShelf {
  shelfCategory: string;
  vertical: number;
  horizontal: number;
}
