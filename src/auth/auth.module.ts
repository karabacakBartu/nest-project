import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schema/user.schema';
import { ResponseService } from '../response/response.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    ClientModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, ResponseService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
