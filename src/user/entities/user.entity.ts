import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Produto } from "src/produtos/entities/produto.entity";

export enum UserRole {
    USER = 'USER',
    MANAGER = 'MANAGER',
    ADMIN = 'ADMIN',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomeUsuario: string;

    @Column()
    nome: string;

    @Column()
    senha: string;

    @Column()
    email: string;

    @Column({
        type: 'varchar',
        default: UserRole.USER
    })
    role: UserRole;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
    if (this.senha && !this.senha.startsWith('$2b$')) {
        this.senha = await bcrypt.hash(this.senha, 10);
        }
    }

    @OneToMany(() => Produto, produto => produto.lojista)
    produtos: Produto[];

    @ManyToMany(() => Produto, (produto) => produto.favoritadoPor, { cascade:true})
    @JoinTable()
    favoritos: Produto[];
}