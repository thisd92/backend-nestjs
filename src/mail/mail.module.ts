import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: 'lewis.bogisich89@ethereal.email',
          pass: 'bX4RCWfHaCpPXq5qyf',
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: '"Nestjs Ecommerce" <lewis.bogisich89@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class MailModule {}
