import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop()
  bookName: string;

  @Prop()
  author: string;

  @Prop()
  kind: string;

  @Prop()
  vol: number;

  @Prop()
  releaseDate: Date;

  @Prop()
  shelf: IShelf;

  @Prop({
    default(): string {
      return null;
    },
  })
  takingDate: Date;

  @Prop({
    default(): string {
      return null;
    },
  })
  returnDate: Date;
}

interface IShelf {
  vertical: number;
  horizontal: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
