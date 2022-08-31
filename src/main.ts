import { NestFactory, Reflector } from '@nestjs/core';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { ClassSerializerInterceptor } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // FILTRO PARA CAPTURAR ERRORES
  app.useGlobalFilters(new AllExceptionFilter());

  // INTERCEPTOR: PARA QUE LA CONSULTA A UNA API NO DURE MAS DE 2 MIN
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
