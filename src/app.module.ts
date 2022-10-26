import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import getDatabaseUrl from './common/database/database';
import { BooksModule } from './books/books.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    UsersModule,
    BooksModule,
    ClientModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(getDatabaseUrl()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
