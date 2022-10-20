import { Module } from '@nestjs/common';
import {UsersModule} from "./users/users.module";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule,MongooseModule.forRoot("mongodb+srv://bartu:156612@cluster0.itgsdyh.mongodb.net/Library?retryWrites=true&w=majority")],
  controllers: [],
  providers: [],
})
export class AppModule {}
