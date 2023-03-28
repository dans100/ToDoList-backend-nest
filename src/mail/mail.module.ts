import { Module } from '@nestjs/common';
import mailerconfig = require('../mailerconfig');
import { MailService } from './mail.service';
import { MailerModule } from '@nest-modules/mailer';

@Module({
  imports: [MailerModule.forRoot(mailerconfig)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
