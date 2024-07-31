export class Product { //a esta entity no se le puso anotaciones porque en este proyecto usamos el orm de Prisma, y eso pues ya genera como un entity como lo visto en el curso 2 de nodejs, asi que este entity solo es para darnos una idea de cómo luce un product
    
    public id: number;

    public name: string;

    public price: number;
}
