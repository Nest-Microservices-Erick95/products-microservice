import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  @MessagePattern({ cmd: 'create_product' }) //OJO que la anterior linea del @Post() se comentó, y tambien se hizo con los @Get, @Patch y @Delete de los otros endpoints de abajo, porque eso es para peticiones http como cuando tenemos un monolito por ejemplo, pero para microservicios como se vio en el main.ts ponemos que la comunicacion para llamar a los endpoints de este microservicio que sea mediante TCP y no mediante HTTP, por eso aqui para los endpoints del controller de nuestros microservicios ya no se pone lo del @Post(), @Get() y asi porque esos son metodos http, pero pues con los microservicios para consumir sus endpoints ya no lo hacemos mediante http sino mediante TCP, y por eso se pone lo de esta linea del @MessagePattern, y en sus parentesis se pone lo que sea que queramos que sea la forma de llamar a este endpoint desde otro microservicio, puede ser un string, un objeto como se ve aqui o lo que sea, en este caso pusimos { cmd: 'create_product' }, lo que significa que desde otro microservicio debemos mandar exactamente ese objeto asi tal cual para comunicarnos con este endpoint de este microservicio de products
  create(
    // @Body() createProductDto: CreateProductDto
    @Payload() createProductDto: CreateProductDto //lo de la anterior linea se comentó porque para microservicios ya no necesitamos el @Body() ni el @Query() ni nada de eso sino que ahora solo se usa el @Payload() , que será un objeto como request body pero especial que nos mandará otro microservicio a este para que ese otro microservicio al llamar a este endpoint de este microservicio mande ese request body o payload, pero pues al trabajar con microservicios ya no se le pone @Body() ni @Query() para el caso de dtos con query params como se ve en el endpoint de findAll de abajo, sino que ahora solo se pone @Payload() y solo puede haber un solo @Payload() en cada endpoint, no mas de 1. Y entonces como con los microservicios se declaró en el main.ts de que la comunicacion para acceder a estos endpoints mediante TCP entonces no podremos acceder a estos endpoints de aqui desde postman porque postman usar comunicacion HTTP, pero podremos probar estos endpoints mediante el microservicio del gateway, porque ese microservicio del gateway será como un hibrido porque recibirá peticiones http para que nuestro frontend o postman puedan llamarlo, y a su vez ese microservicio del gateway se comunicará a los endpoints de nuestros otros microservicios mediante TCP, asi que podremos probar nuestros endpoints usando el microservicio del gateway del microservicio gateway-ms de este curso de nest con microservicios. Me refiero a gateway como el gateway visto en los cursos de spring boot con microservicios, osea el punto de entrada desde nuestro frontend o postman hacia nuestros microservicios
  ) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'find_all_products' })
  findAll( 
    // @Query() paginationDto: PaginationDto 
    @Payload() paginationDto: PaginationDto 
  ) {
    return this.productsService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'find_one_product' })
  findOne(
    // @Param('id', ParseIntPipe) id: number
    @Payload('id', ParseIntPipe) id: number //tambien el @Param del path variable de los monolitos se cambia a @Payload para los microservicios
  ) {
    return this.productsService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update_product' })
  update(
    // @Param('id', ParseIntPipe) id: number, 
    // @Body() updateProductDto: UpdateProductDto
    @Payload() updateProductDto: UpdateProductDto //como dijimos arriba, solo se puede mandar un solo @Payload en nuestros endpoints cuando usamos microservicios, pero arriba teníamos un request body del updateProductsDto y un path variable del id, entonces lo que se hizo aqui es que en el UpdateProductDto del archivo update-product.dto.ts se añadió el atributo del id para que en este unico dto se pasen ambas cosas, tanto lo del dto del request body como lo del id, tambien se puee hacer eso en los microservicios
  ) {
    // return this.productsService.update(id, updateProductDto);
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_product' })
  remove(
    // @Param('id', ParseIntPipe) id: number
    @Payload('id', ParseIntPipe) id: number
  ) {
    return this.productsService.remove(id);
  }
}
