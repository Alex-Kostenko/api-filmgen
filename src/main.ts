import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [/localhost:\d+$/, /\.vercel\.app$/, /\.herokuapp\.com$/],
    allowedHeaders: ['content-type', 'accept', 'origin', 'application/json'],
    credentials: true,
  });

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
