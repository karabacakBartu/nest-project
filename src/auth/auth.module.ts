import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schema/user.schema';
import { ResponseService } from '../response/response.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientModule } from '../client/client.module';
import { MailService } from '../mailer/mailer.service';
import { Code, CodeSchema } from './schema/code.schema';

@Module({
  imports: [
    ClientModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Code.name, schema: CodeSchema },
    ]),
  ],
  providers: [AuthService, ResponseService, MailService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
