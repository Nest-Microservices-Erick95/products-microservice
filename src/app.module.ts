import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';

//en este proyecto se usó npm en lugar de yarn como pasó en el curso de nest
//en este proyecto se puso en la raiz del proyecto: npm i class-validator class-transformer
//en este proyecto se puso en la raiz del proyecto: npm i dotenv joi , esto para poder usar variables de entorno y usar el paquete de joi para validar esas variables de entorno, esas validaciones con joi se hizo en el archivo envs.ts de la carpeta config de este proyecto, checarlo

//en este proyecto se usó prisma en lugar de typeorm (el cual se vio en el curso de nest)
//en este proyecto se puso en la raiz del proyecto: npm install prisma --save-dev , esto para instalar el orm de prisma visto en el curso 2 de nodejs, ahi en el curso 2 de nodejs podemos ver todo lo relacionado a prisma, y vemos que para intalar prisma se puso --save-dev para poner esa dependencia como desarrollo, osea hubiera sido lo mismo poner npm install -D prisma , asi de esa forma se instala prisma y lo vemos en el curso 2 de nodejs
//en este proyecto se puso en la raiz del proyecto (despues de hacer lo de la anterior linea): npx prisma init , esto para inicializar prisma y con esto se crea la carpeta llamada prisma en nuestro proyecto, esto igual se ve en el curso 2 de nodejs. Y OJO que esto tambien en nuestro archivo .env nos creó la variable de entorno de DATABASE_URL , en la cual nosotros como valor le pusimos al principio "file:./dev.db" , asi con todo y las comillas, eso para usar la base de datos de sqlite, la cual es una base de datos en memoria apta solo para desarrollo, no para produccion ya que para produccion se usa las bases de datos normales como postgresql, mysql, mongodb, etc, asi que el sqlite es como la base de datos h2 en spring boot, ambas en memoria y para desarrollo solamente, y pues esa variable de entorno de DATABASE_URL la usa prisma en su archivo schema.prisma de la carpeta prisma que se creó con el comando mencionado en esta linea, y nosotros manualmente en ese archivo de schema.prisma donde dice datasource db , en su atributo provider de ese objeto se puso como valor "sqlite" en lugar de "postgresql" como lo tiene por default, esto para usar la base de datos de sqlite, y pues ahi en ese archivo de schema.prisma es donde se define cómo estarán nuestras tablas de la base de datos y sus relaciones y asi, todo esto se vio en el curso 2 de nodejs
//en este proyecto se puso en la raiz del proyecto (despues de hacer lo de la anterior linea): npx prisma migrate dev --name init , esto para hacer la migracion del esquema que pusimos en el schema.prisma para nuestras tablas, a la base de datos, osea convertir nuestro esquema de las tablas que pusimos en el archivo schema.prisma a nuestras tablas en la base de datos, en este caso en la base de datos de sqlite como se dijo en anteriores lineas, y ese nombre de dev del comando que se mencionó será el nombre de nuestra base de datos, la cual en el caso de sqlite estará en el archivo llamado dev.db dentro de la carpeta de prisma, con este comando mencionado en esta linea se creará ese archivo, entonces en el dev.db estarán nuestras tablas, y lo del --name init es para darle un nombre a esa migracion como para identificar qué hicimos en esa migracion de nuestro esquema de prisma a nuestras tablas de la base de datos, como los nombres de los commits de git por ejemplo. Y este comando se migrate lo pondremos siempre que hagamos algun cambio en nuestros esquemas de las tablas en el archivo schema.prisma , esto para reflejar ya esos cambios en ese archivo en nuestras tablas de la base de datos, osea que si por ejemplo despues agregamos una columna en algun esquema del schema.prisma entonces debemos ejecutar este comando otra vez para que esa nueva columna se le añada a la tabla de la base de datos
//en este proyecto se puso en la raiz del proyecto (despues de hacer lo de la anterior linea): npm install @prisma/client , esto para poder usar el orm de prisma en nuestros archivos de nuestro proyecto para hacer operaciones en las tablas de nuestra base de datos como crear, actualizar, eliminar, obtener y asi, todo esto tambien se vio en el curso 2 de nodejs
//tambien para usar prisma en nuestros services (archivo de .service.ts) en esas clases de los services debemos extender de la clase de PrismaClient y debemos implementar la interfaz de OnModuleInit, y al implementar esa interfaz tendremos que poner en nuestra clase del service el metodo onModuleInit() y ahi dentro de ese metodo poner this.$connect() , eso hará que en esa clase se conecte a nuestro cliente de prisma para poder usar el orm de prisma dentro de esa clase para poder hacer operaciones en nuestras tablas de la base de datos como se vio en el curso 2 de nodejs, esto podemos verlo en el archivo products.service.ts del modulo de products de este proyecto, asi entonces podemos usar prisma con nest
//usando el archivo de dev.db generado por prisma para nuestra base de datos de sqlite como se explicó arriba podremos abrir esa base de datos para ver las tablas y asi usando TablePlus por ejemplo

//en este proyecto se puso en la raiz del proyecto: npm i --save @nestjs/microservices , esto para poder configurar nuestro proyecto para ser un microservicio con comunicacion con otros microservicios mediante tcp, esto se configuró en el main.ts, y tambien se configuraron los endpoints que tenemos en el products.controller.ts para que en lugar de tratarse de una api rest que se traten esos endpoints como de un microservicios con el cual otros microservicios se pueden comunicar
//En este curso se vio cómo subir a github los repositorios de nuestros microsercicios pero para tener todos nuestros microservicios agrupados en un solo lugar y no que cada microservicio este por separado y asi, para eso usamos Github organizations, checarlo en este video del curso: https://cursos.devtalles.com/courses/take/nestjs-microservicios/lessons/53294801-github-organizations-agrupar-repositorios

@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
