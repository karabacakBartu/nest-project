import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { BooksService } from '../books/books.service';
import { Types } from 'mongoose';
import { ITakeBookInputInterface } from './interface/take.book.input.interface';
import { TakeBookDto } from './dto/take.book.dto';
import { ReturnDateDto } from './dto/return.date.dto';
import { RebateBookDto } from './dto/rebate.book.dto';
import { UpdateReturndateDto } from './dto/update.returndate.dto';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly booksService: BooksService,
  ) {}

  async takeBook(
    getBookDto: TakeBookDto,
    userId: string,
    returnDateDto: ReturnDateDto,
  ) {
    const userObjId = new Types.ObjectId(userId);
    const book = await this.booksService.getOneBook(getBookDto);
    const user = await this.clientRepository.getUser(userObjId);

    if (book.length > 0) {
      if (user.bookRights !== 0) {
        console.log('aaa');
        const takeBook = await this.booksService.takeBook(
          getBookDto,
          returnDateDto,
        );

        const takeBookInputInterface: ITakeBookInputInterface = {
          _id: takeBook._id,
          bookName: takeBook.bookName,
          author: takeBook.author,
          kind: takeBook.kind,
          vol: takeBook.vol,
          releaseDate: takeBook.releaseDate,
          takingDate: takeBook.takingDate,
          returnDate: takeBook.returnDate,
        };
        console.log(takeBookInputInterface, 'interface');

        return await this.clientRepository.takeBook(
          takeBookInputInterface,
          userObjId,
        );
      }
      throw new NotAcceptableException(
        'You cant take more book for this month.',
      );
    }
    throw new NotFoundException('Book is not find.');
  }

  async rebateBook(clientId: string, rebateBookDto: RebateBookDto) {
    const clientObjId = new Types.ObjectId(clientId);
    const { bookId, bookName } = rebateBookDto;
    const bookObjId = new Types.ObjectId(bookId);

    const rebate = await this.clientRepository.rebateBook(
      clientObjId,
      bookObjId,
      bookName,
    );
    if (rebate.modifiedCount === 1) {
      await this.booksService.cleanReturnAndTakingDate(bookObjId, bookName);
      return rebate;
    }
  }

  async updateReturnDate(
    updateReturndateDto: UpdateReturndateDto,
    userId: string,
  ) {
    const userObjId = new Types.ObjectId(userId);

    const { returnDate, bookId, bookName } = updateReturndateDto;

    const bookObjId = new Types.ObjectId(bookId);

    return await this.clientRepository.updateReturndDate(
      returnDate,
      bookObjId,
      bookName,
      userObjId,
    );
  }
}
