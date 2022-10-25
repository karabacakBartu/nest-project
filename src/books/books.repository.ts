import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/book.schema';
import { CreateBookDto } from './dto/create.book.dto';
import { GetBookDto } from './dto/get.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
  ) {}

  async createBook(createBookDto: CreateBookDto) {
    return await this.bookModel.create(createBookDto);
  }

  async getBooks() {
    return await this.bookModel.find().exec();
  }

  async getBook(getBookDto: GetBookDto) {
    return await this.bookModel.find(getBookDto).exec();
  }

  async updateBook(updateBookDto: UpdateBookDto, _id: Types.ObjectId) {
    const match = {
      _id,
    };

    return await this.bookModel.updateOne(match, updateBookDto).exec();
  }
}
