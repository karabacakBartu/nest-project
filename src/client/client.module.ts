import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseService } from '../response/response.service';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { User, UserSchema } from '../users/schema/user.schema';
import { BooksService } from '../books/books.service';
import { BooksModule } from '../books/books.module';
import { BooksRepository } from '../books/books.repository';
import { Book, BookSchema } from '../books/schema/book.schema';
import { ClientRepository } from './client.repository';

@Module({
  imports: [
    BooksModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  providers: [
    ResponseService,
    BooksService,
    BooksRepository,
    ClientService,
    ClientRepository,
  ],
  controllers: [ClientController],
  exports: [ClientService],
})
export class ClientModule {}
