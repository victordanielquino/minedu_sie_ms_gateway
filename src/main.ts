import { NestFactory, Reflector } from '@nestjs/core';
import { AllExceptionFilter } from './core/filters/http-exception.filter';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // FILTRO PARA CAPTURAR ERRORES
  app.useGlobalFilters(new AllExceptionFilter());

  // INTERCEPTOR: PARA QUE LA CONSULTA A UNA API NO DURE MAS DE 2 MIN
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // CLASS VALIDATION / CLASS TRANSFORM
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // se llegan atributos que no estan definidos en el dtos, los ignora y continua
      forbidNonWhitelisted: true, // alerta de atributos que no esta definido en el esquema de los dtos
      transformOptions: { enableImplicitConversion: true }, // convierte string a number en @Query params
    }),
  );

  // DOCUMENTACION
  const config = new DocumentBuilder()
    .setTitle('API GATEWAY V1')
    .setDescription('DOCUMENTS OF API BY VICTOR QUINO')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('MICROSERVICES API-GATEWAY')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });

  // PREFIX:
  app.setGlobalPrefix('api/v1');

  // habilitar acceso a todos CORS:
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
