import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    //OJO que normalmente en los dtos del request como este dto para el update no se pone el id, ya que los id se suelen mandar como path variable y no en el request body, pero aqui se puso por lo que se explica en el products.controller.ts sobre los microservicios, checarlo
    @IsNumber()
    @IsPositive()
    id: number;

}
