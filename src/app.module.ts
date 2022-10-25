import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import getDatabaseUrl from './common/database/database';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    UsersModule,
    BooksModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(getDatabaseUrl()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
