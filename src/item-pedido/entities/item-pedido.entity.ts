import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Produto } from "src/produtos/entities/produto.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ItemPedido {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => Pedido, pedido => pedido.items)
  pedido: Pedido;

  @ManyToOne(() => Produto)
  produto: Produto;

  @Column() 
  quantity: number;

  @Column('decimal') 
  price: number;
}
