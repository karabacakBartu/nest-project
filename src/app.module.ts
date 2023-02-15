import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import getDatabaseUrl from './common/database/database';
import { BooksModule } from './books/books.module';
import { ClientModule } from './client/client.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    UsersModule,
    BooksModule,
    ClientModule,
    S3Module,
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule,
    MongooseModule.forRoot(getDatabaseUrl()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
