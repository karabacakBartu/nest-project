import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { User, UserSchema } from '../users/schema/user.schema';
import { BooksModule } from '../books/books.module';
import { Book, BookSchema } from '../books/schema/book.schema';
import { ClientRepository } from './client.repository';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [
    S3Module,
    BooksModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  providers: [ClientService, ClientRepository],
  controllers: [ClientController],
  exports: [ClientService],
})
export class ClientModule {}
