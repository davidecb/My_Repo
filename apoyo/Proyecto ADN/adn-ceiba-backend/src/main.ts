import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { FiltroExcepcionesDeNegocio } from './infraestructura/excepciones/filtro-excepciones-negocio';
import { AppLogger } from './infraestructura/configuracion/ceiba-logger.service';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './infraestructura/configuracion/environment/env-variables.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = await app.resolve(AppLogger);
  const configService = app.get(ConfigService);
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Bloque Arquitectura Hexagonal Node')
    .setDescription('Bloque que hace uso de Nest.js para la creación de API\'s con Node.js')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/api/doc', app, swaggerDocument);

  app.setGlobalPrefix(configService.get(EnvVariables.APPLICATION_CONTEXT_PATH));
  await app.listen(configService.get(EnvVariables.APPLICATION_PORT));
}
bootstrap();
