import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseService } from '../response/response.service';
import { BooksRepository } from './books.repository';
import { Book, BookSchema } from './schema/book.schema';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { S3Module } from '../s3/s3.module';
import { ResponseModule } from '../response/response.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    S3Module,
    ResponseModule,
  ],
  providers: [BooksService, BooksRepository],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
