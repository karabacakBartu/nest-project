import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import getDatabaseUrl from './common/database/database';
import { BooksModule } from './books/books.module';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import { S3Module } from './s3/s3.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mailer/mailer.service';

@Module({
  imports: [
    UsersModule,
    BooksModule,
    ClientModule,
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'bartusk.1997@gmail.com',
          pass: 'ugbnnaytynlloxiw',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      preview: false,
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    S3Module,
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(getDatabaseUrl()),
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule {}
