import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseService } from '../response/response.service';
import { BooksRepository } from './books.repository';
import { Book, BookSchema } from './schema/book.schema';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  providers: [BooksService, BooksRepository, ResponseService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
