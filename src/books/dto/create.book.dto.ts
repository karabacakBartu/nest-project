import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBookDto {
  @ApiProperty()
  @MaxLength(72, { message: 'Book name must have maximum 72 characters.' })
  @IsDefined()
  @IsNotEmpty()
  bookName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  author: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  kind: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  vol: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  releaseDate: Date;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  shelfCategory: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  vertical: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  horizontal: number;
}

interface IShelf {
  shelfCategory: string;
  vertical: number;
  horizontal: number;
}
