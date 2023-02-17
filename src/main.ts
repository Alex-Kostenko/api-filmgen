import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* app.enableCors({
    origin: ['http://localhost:3000', 'https://api-filmgen-pearl.vercel.app'],
    methods: ['GET', 'POST'],
    credentials: true,
  });*/

  // let whitelist = [
  //   'http://localhost:3000',
  //   'https://api-filmgen-pearl.vercel.app',
  // ];

  // app.enableCors({
  //   credentials: true,
  //   origin: function (origin, callback) {
  //     if (whitelist.indexOf(origin) !== -1) {
  //       console.log('allowed cors for:', origin);
  //       callback(null, true);
  //     } else {
  //       console.log('blocked cors for:', origin);
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
  //   allowedHeaders:
  //     'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  // });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use('/favicon-*', (_, res) => res.send());

  const options = new DocumentBuilder()
    .setTitle('Api Filmgem')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    customCssUrl: process.env.SWAGGER_CSS,
  });

  await app.listen(3000);
}
bootstrap();
