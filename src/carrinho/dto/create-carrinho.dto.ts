import { IsNumber } from 'class-validator';

export class CreateCarrinhoDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  produtoId: number;

  @IsNumber()
  quantidade: number;
}