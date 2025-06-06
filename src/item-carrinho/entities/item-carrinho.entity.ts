/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class ItemCarrinho {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => Carrinho, carrinho => carrinho.items)
  carrinho: Carrinho;

  @ManyToOne(() => Produto)
  produto: Produto;

  @Column() quantidade: number;
}
