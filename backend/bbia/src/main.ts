import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import { IncomingMessage } from 'http';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  type fun = () => void;

  app.use((req: IncomingMessage, res: any, next: fun) => {
    // logger middleware (cloudfare first)
    const { method, url } = req;
    const ip = req.headers['x-forwarded-for'] || req.url;
    const date = new Date().toString();
    // response status code
    res.on('finish', () => {
      const { statusCode } = res;
      console.log(`${date} ${ip} ${method} ${url} ${statusCode}`);
    });
    next();
  });

  // check if the request is from cloudfare, if not, block the request
  app.use((req: IncomingMessage, res: Response, next: fun) => {
    const ip = req.headers;
    console.log(ip);
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('BBIA API')
    .setVersion('0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
