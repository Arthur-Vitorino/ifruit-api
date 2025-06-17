import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/entities/user.entity';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  create(@Body() createProdutoDto: CreateProdutoDto, @Request() req) {
    const userId = req.user.id;
    return this.produtosService.create(createProdutoDto, userId);
  }

  @Get()
  findAll(@Request() req, @Query('categoria') categoria?: string) {
    const categoriaId = categoria ? parseInt(categoria, 10) : undefined;
    return this.produtosService.findAll(categoriaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }

  @Post(':id/favoritar')
  @UseGuards(AuthGuard('jwt'))
  favoritar(@Param('id') id: string, @Request() req) {
    return this.produtosService.favoritarProduto(+id, req.user.id);
  }

  @Get('favoritos')
  @UseGuards(AuthGuard('jwt'))
  listarFavoritos(@Request() req) {
    return this.produtosService.listarFavoritos(req.user.id)
  }
}
