import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import handlebars from 'handlebars';

const emailTemplate = fs.readFileSync(
  '/Users/b.karabacak/Desktop/nest-project/nest-project/src/mailer/template/mail-template.hbs',
  'utf8',
);

const template = handlebars.compile(emailTemplate);

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async example(mail: string, code: string) {
    const htmlToSend = template({ code });
    return this.mailerService
      .sendMail({
        to: mail, // list of receivers
        from: 'bartusk.1997@gmail.com', // sender address
        subject: 'Geliyor mu?', // Subject line
        text: 'Test başşarılı...', // plaintext body
        html: htmlToSend,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
