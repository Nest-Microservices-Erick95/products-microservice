import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Main');

  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>( //lo de la anterior linea se comentó porque eso sería cuando tenemos un proyecto monolitico como lo visto en el curso de nest, pero para microservicios tenemos que hacerlo de esta forma como se ve aqui
    AppModule,
    {
      transport: Transport.TCP, //definimos aqui cómo comunicar este microservicio con los demas microservicios, en este caso estamos diciendo que este microservicio se comunicará con los demas, o los demas con este microservicio, mediante TCP, tambien puede hacerse de otras formas pero en este caso se puso por TCP. Con esto los endpoints de este microservicio de products de este proyecto ya no los podremos llamar usando postman porque postman lo llama mediante comunicacion HTTP, pero aqui estamos estableciendo la comunicacion mediante TCP
      options: {
        port: envs.port //este es el puerto en el que estará escuchando este microservicio para que otros microservicios se comuniquen con este. Esto de envs.port se definió en el archivo envs.ts de la carpeta config de este proyecto, ahi se validó tambien nuestras variables de entorno que pongamos en el archivo .env usando el paquete de joi, checarlo
      }
    }
  );
  
  app.useGlobalPipes(  
    new ValidationPipe({ 
      whitelist: true, 
      forbidNonWhitelisted: true, 
    }) 
  );
  
  await app.listen(); //aqui no se puso el puerto porque eso ya se definió arriba en la configuracion de microservicios de arriba
  logger.log(`Products microservice running on port ${envs.port}`);
}
bootstrap();
