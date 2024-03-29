import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { CreateBookDto } from './dto/create.book.dto';
import { GetBookDto } from './dto/get.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';
import { Types } from 'mongoose';
import { TakeBookDto } from '../client/dto/take.book.dto';
import { ReturnDateDto } from '../client/dto/return.date.dto';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly s3Service: S3Service,
  ) {}

  async createBook(createBookDto: CreateBookDto, file) {
    const url = await this.s3Service.s3_upload(
      file.buffer,
      file.originalname,
      'foto',
    );

    console.log(url);
    // return await this.booksRepository.createBook(createBookDto);
  }

  async getBooks() {
    return await this.booksRepository.getBooks();
  }

  async getBook(getBookDto: GetBookDto) {
    const book = await this.booksRepository.getBook(getBookDto);
    const bookCount = book.length;

    return { book, bookCount };
  }

  async getOneBook(getBookDto: TakeBookDto) {
    return await this.booksRepository.getOneBook(getBookDto);
  }

  async updateBook(updateBookDto: UpdateBookDto, bookId: string) {
    const bookObjId = new Types.ObjectId(bookId);

    return await this.booksRepository.updateBook(updateBookDto, bookObjId);
  }

  async takeBook(getBookDto: GetBookDto, returnDateDto: ReturnDateDto) {
    return await this.booksRepository.takeBook(getBookDto, returnDateDto);
  }

  async cleanReturnAndTakingDate(bookId: Types.ObjectId, bookName: string) {
    return await this.booksRepository.cleanReturnAndTakingDate(
      bookId,
      bookName,
    );
  }
}
