import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import { IncomingMessage, ServerResponse } from 'http';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  type fun = () => void;

  app.use((req: IncomingMessage, res: any, next: fun) => {
    // logger middleware (cloudfare first)
    const { method, url } = req;
    const host = req.headers['host'];
    const ip = req.headers['cf-connecting-ip'] || req.connection.remoteAddress;
    const date = new Date().toString();
    // response status code
    res.on('finish', () => {
      const { statusCode } = res;
      console.log(`${date} ${ip} ${host} ${method} ${url} ${statusCode}`);
    });
    next();
  });

  // check if the request is from cloudfare, if not, block the request
  app.use((req: IncomingMessage, res: ServerResponse, next: fun) => {
    if (process.env.DATABASE_URL.includes('localhost')) {
      next();
      return;
    }
    const isCloudflare =
      req.headers['cf-connecting-o2o'] === '1' &&
      req.headers['host'] === 'backendbbia.martinrougeron.me';
    if (!isCloudflare) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }
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
