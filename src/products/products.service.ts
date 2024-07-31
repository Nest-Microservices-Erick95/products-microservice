import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit { //este extends e implements se puso por lo del orm de prisma descrito en el app.module.ts
  
  private readonly logger = new Logger('ProductsService');

  onModuleInit() { //este metodo se puso por lo del orm de prisma descrito en el app.module.ts. Este metodo se ejecutará automaticamente al iniciarse nuestro proyecto, o mas bien al iniciarse este modulo de products
    this.$connect();
    this.logger.log('database connected');
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({ //crea un product en la tabla y retorna ese product creado ya con todo y su id generado y asi
      data: createProductDto
    });
  }

  async findAll(paginationDto: PaginationDto) {
    // return this.product.findMany({}); //para retornar todos los products sin paginar
  
    const { page, limit } = paginationDto;
    const total = await this.product.count({ where: { available: true } });
    const lastPage = Math.ceil(total / limit);

    return {
      data: await this.product.findMany({ //los elementos encontrados en esa pagina y con ese limite que le pasamos
        skip: (page - 1) * limit,
        take: limit,
        where: { available: true }
      }),
      meta: {
        total, //el total de elementos 
        page, //la pagina actual
        lastPage, //la ultima pagina,
        isLastPage: page === lastPage, //si es la ultima pagina
        isFirstPage: page === 1 //si es la primera pagina
      }
    };
  }

  async findOne(id: number) {
    const product = await this.product.findFirst({
      where: { id, available: true }
    });

    if(!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const {id: _, ...data} = updateProductDto; //esto se puso debido a lo que se explicó de los microservicios en el products.controller.ts, ya que con eso modificamos el UpdateProductDto para que tenga el id como atributo, pero pues ese id dentro del updateProductDto no lo ocupamos aqui, por eso con esto lo excluimos y ya el objeto data de aqui tendrá el mismo objeto que el updateProductDto pero sin el id
    
    await this.findOne(id);

    return this.product.update({ //actualiza el registro en la tabla y retorna el objeto ya actualizado
      where: { id },
      // data: updateProductDto
      data //se comentó lo de la anterior linea porque debido a lo que explicamos de los microservicios en el products.controller.ts aqui el updateProductDto tenía incluido el atributo del id, pero eso podría dar problemas entonces para excluir el id del data de este update pues se puso lo de esta linea de usar el objeto data creado arriba, el cual tiene lo mismo del updateProductDto pero sin el id
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    // return this.product.delete({ //para eliminar fisicamente un registro de la tabla, y retorna el product eliminado
    //   where: { id }
    // });

    const product = await this.product.update({ //para eliminarlo pero no fisicamente de la tabla sino que solo colocarle el valor de false o 0 en la columna de available de esa tabla como una bandera para decir que ese product ya no existe o fue eliminado pero sin eliminarlo fisicamente, esta forma de eliminar es especialmente util en los microservicios para que nuestros otros microservicios no pierdan la integridad referencial de un registro de la tabla de este microservicio de products
      where: { id },
      data: {
        available: false
      }
    });
    return product;

  }
}
