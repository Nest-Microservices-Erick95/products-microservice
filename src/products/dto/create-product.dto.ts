import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {

    @IsString()
    public name: string;

    @IsNumber({
        maxDecimalPlaces: 4 //para que acepte maximo 4 decimales en su numero
    })
    @Min(0)
    @Type(() => Number)
    public price: number;
}
