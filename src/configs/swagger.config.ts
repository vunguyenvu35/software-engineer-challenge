import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Nestjs software engineer challenge')
  .setDescription('The nestjs software engineer challenge description')
  .setVersion('1.0')
  .addTag('Service')
  .addBearerAuth()
  .build();

export { swaggerConfig };
