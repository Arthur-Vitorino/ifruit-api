/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsEmail, IsDateString, IsNumber, Min, Max } from 'class-validator';

export class CreateProdutoDto {
    @IsString({ message: 'Necessário que seja String' })
    nome: string;

    @IsNumber()
    @Min(0, { message: 'Necessário que o valor seja maior que 0'})
    @Max(10, { message: 'Necessário que o valor seja menor que 10.0'})
    preco: number;

    @IsEmail({}, { message: 'E-mail inválido' })
    emailEmpresa: string;

    @IsDateString({},{ message: 'Data inválida' })
    dataValidade: Date;

    categoriaId: number;
}