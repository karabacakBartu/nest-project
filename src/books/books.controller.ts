import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseService } from '../response/response.service';
import { MongoDbIdDto } from '../common/dto/mongoDbId.dto';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create.book.dto';
import { GetBookDto } from './dto/get.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('/create-book')
  async createBook(@Body() createBookDto: CreateBookDto) {
    const result = await this.booksService.createBook(createBookDto);
    const response = { statusCode: 201, data: result, message: 'OK' };
    return response;
  }

  @Post('/update-book/:id')
  async updateBook(
    @Param() param: MongoDbIdDto,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const result = await this.booksService.updateBook(updateBookDto, param.id);
    const response = { statusCode: 201, data: result, message: 'OK' };
    return response;
  }

  @Get()
  async getBooks() {
    const result = await this.booksService.getBooks();
    const response = { statusCode: 201, data: result, message: 'OK' };
    return response;
  }

  /**
   *
   * Get book for looking with which parameter, also can get all books
   * if not fill any parameter.
   *
   * @param getBookDto
   */
  @Get('/book')
  async getBook(@Body() getBookDto: GetBookDto) {
    const result = await this.booksService.getBook(getBookDto);
    const response = { statusCode: 201, data: result, message: 'OK' };
    return response;
  }
}
