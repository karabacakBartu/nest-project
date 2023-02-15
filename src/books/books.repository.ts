import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/book.schema';
import { CreateBookDto } from './dto/create.book.dto';
import { GetBookDto } from './dto/get.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';
import { ReturnDateDto } from '../client/dto/return.date.dto';
import { ICreateBookInterface } from './interface/create.user.interface';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
  ) {}

  async createBook(createInput: ICreateBookInterface) {
    return await this.bookModel.create(createInput);
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

  async getOneBook(getBookDto: GetBookDto) {
    return await this.bookModel.find(getBookDto).exec();
  }

  async takeBook(getBookDto: GetBookDto, returnDateDto: ReturnDateDto) {
    Object.assign(getBookDto, { takingDate: null });
    console.log(getBookDto);
    const update = {
      takingDate: Date.now(),
      returnDate: returnDateDto.returnDate,
    };

    return await this.bookModel
      .findOneAndUpdate(getBookDto, update, { new: true })
      .exec();
  }

  async cleanReturnAndTakingDate(bookId: Types.ObjectId, bookName: string) {
    return await this.bookModel
      .updateOne(
        { _id: bookId, bookName },
        { returnDate: null, takingDate: null },
      )
      .exec();
  }
}
