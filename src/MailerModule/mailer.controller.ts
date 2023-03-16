import { Controller, Get } from '@nestjs/common';
import { MailerServicer } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerServicer: MailerServicer) { }
  @Get()
  async getMailer() {
    return this.mailerServicer.sendy();
  }
}
