import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('Docs').build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger/docs', app, document)

  await app.listen(3000);
}
bootstrap();
