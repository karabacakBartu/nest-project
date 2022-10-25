import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { BooksRepository } from './books.repository';
import { CreateBookDto } from './dto/create.book.dto';
import { GetBookDto } from './dto/get.book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly usersRepository: BooksRepository) {}

  async createBook(createBookDto: CreateBookDto) {
    return await this.usersRepository.createBook(createBookDto);
  }

  async getBooks() {
    return await this.usersRepository.getBooks();
  }

  async getBook(getBookDto: GetBookDto) {
    return await this.usersRepository.getBook(getBookDto);
  }
}
