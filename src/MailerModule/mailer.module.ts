import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerServicer } from './mailer.service';
import { MailerController } from './mailer.controller';

@Module({
    imports: [
        //MailerModule.forRootAsync({
        //    useFactory: () => ({
        MailerModule.forRoot({
            transport: {
                //pode ser URI igual de database tambem
                host: 'smtp-mail.outlook.com',
                port: 587,
                auth: {
                    user: 'testingsendernoder@hotmail.com',
                    pass: 'KY()i^Nw6uZ-s$:',
                    //user: process.env.MAILDEV_INCOMING_USER,
                    //pass: process.env.MAILDEV_INCOMING_PASS,
                },
            },
            defaults: {
                //FROM+TO+SUBJECT ~~~~~ Se não passar no service ele pega aqui no defaults o que faltar
                //from: '"nest-modules" <modules@nestjs.com>', */
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailerServicer],
    controllers: [MailerController],
})
export class MailerModuler { }
