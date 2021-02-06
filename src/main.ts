import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
    }),
  );
  // if (process.env.NODE_ENV === 'production') {
    const config = new DocumentBuilder()
      .setTitle('Shpp api')
      .setDescription('Shop API description')
      .setVersion('1.0')
      .addTag('api')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  // }


  await app.listen(process.env.PORT);
}
bootstrap();
