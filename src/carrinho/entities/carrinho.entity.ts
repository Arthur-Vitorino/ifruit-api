/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ItemCarrinho } from 'src/item-carrinho/entities/item-carrinho.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';

@Entity()
export class Carrinho {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    user: User;
    
    @OneToMany(() => ItemCarrinho, item => item.carrinho, { cascade:true })
    items: ItemCarrinho[];
}
