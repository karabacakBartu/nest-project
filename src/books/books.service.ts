import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { CreateBookDto } from './dto/create.book.dto';
import { GetBookDto } from './dto/get.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';
import { Types } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  async createBook(createBookDto: CreateBookDto) {
    return await this.booksRepository.createBook(createBookDto);
  }

  async getBooks() {
    return await this.booksRepository.getBooks();
  }

  async getBook(getBookDto: GetBookDto) {
    const book = await this.booksRepository.getBook(getBookDto);
    const bookCount = book.length;

    return { book, bookCount };
  }

  async updateBook(updateBookDto: UpdateBookDto, bookId: string) {
    const bookObjId = new Types.ObjectId(bookId);

    return await this.booksRepository.updateBook(updateBookDto, bookObjId);
  }
}
