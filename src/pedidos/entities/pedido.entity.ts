import { ItemPedido } from "src/item-pedido/entities/item-pedido.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn() 
  id: number;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => ItemPedido, item => item.pedido, { cascade: true })
  items: ItemPedido[];

  @Column('decimal') 
  total: number;

  @CreateDateColumn() 
  createdAt: Date;
}
