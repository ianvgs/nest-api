import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerServicer {
    constructor(private readonly mailerService: MailerService) { }
    public sendy() {
        return this.mailerService
            .sendMail({
                to: 'ian.vgs@hotmail.com', // list of receivers
                //AQUI pode ser do NO reply, algo asism, nao precisa ser a nesna credencial do modulo mas precisa ter permissao de envio
                from: 'testingsendernoder@hotmail.com', // sender address
                subject: 'Testing Nest MailerModule ✔', // Subject line
                text: 'welcome', // plaintext body
                html: '<b>welcome</b>', // HTML body content
            })
            .then(() => {
                console.log('enviado');
            })
            .catch((err) => {
                console.log('deu pal' + err);
            });
    }
}
