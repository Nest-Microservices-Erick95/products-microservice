import 'dotenv/config';
import * as joi from 'joi';

//en este archivo se valida las variables de entorno que pongamos en el archivo .env usando el paquete de joi, en el curso de nest se hizo usando el ConfigModule pero aqui se hace usando solo el paquete de joi sin el ConfigModule, asi que esta es otra forma de hacerlo y de hecho es mas facil, aqui en este archivo se hace toda la validacion de nuestras variables de entorno y se retorna el objeto de envs que está hasta abajo donde tendremos todas las variables de entorno definidas en el archivo .env

interface EnvVars {
    PORT: number;
    DATABASE_URL: string;
}

const envsSchema = joi.object({
    PORT: joi.number().required(), //se valida la variable de entorno PORT que definimos en el archivo .env para que sea un numero y sea obligatorio ponerlo en el archivo .env
    DATABASE_URL: joi.string().required()
})
.unknown(true); //para que si ponemos otras variables de entorno en el archivo .env aparte de las definidas arriba en el joi.object que no dé error y las deje pasar, ya que por default si ponemos otra variable de entorno en el archivo .env que no sea las de arriba definidas en el joi.object da error, asi que con esto ya eso no dará error, ademas abajo pusimos el envsSchema.validate con el process.env, y hay que recordar que el process.env es un objeto en nodejs que ademas de tener las variables de entorno que nosotros pusimos en el archivo .env tambien tiene otras variables de entorno ya definidas automaticamente en nodejs, asi que con esto del unknown en true nos aseguramos que asi lo de abajo del envsSchema.validate(process.env) no dé error por esas otras variables de entorno que nodejs define automaticamente en el process.env

const { error, value } = envsSchema.validate(process.env);

if(error) { //si da un error con las variables de entorno segun las validaciones que pusimos en el joi.object de arriba entonces se ejecutará este if y retornará un error y entonces nuestra aplicacion ni siquiera se va a iniciar debido a este error
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value; //para añadirle el tipado el objeto de envVars ya que por default es de tipo any. El value es el objeto puesto en el joi.object de arriba con esas llaves que pusimos ahi y sus valores que le pusimos en el archivo .env a esas variables de entorno

export const envs = { //esto para usarlo en nuestros otros archivos del proyecto para obtener el valor de nuestras variables de entorno que definimos en el archivo .env
    port: envVars.PORT,
    DATABASE_URL: envVars.DATABASE_URL
};