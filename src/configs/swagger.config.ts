import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Nestjs Email Marketing')
  .setDescription('The nestjs email marketing description')
  .setVersion('1.0')
  .addTag('Service')
  .addBearerAuth()
  .build();

export { swaggerConfig };
