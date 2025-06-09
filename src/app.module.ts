import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutosModule } from './produtos/produtos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { ItemCarrinhoModule } from './item-carrinho/item-carrinho.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ItemPedidoModule } from './item-pedido/item-pedido.module';
import { FavoritosModule } from './favoritos/favoritos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProdutosModule,
    CategoriasModule,
    UserModule,
    AuthModule,
    CarrinhoModule,
    ItemCarrinhoModule,
    PedidosModule,
    ItemPedidoModule,
    FavoritosModule
  ],
})
export class AppModule {}
