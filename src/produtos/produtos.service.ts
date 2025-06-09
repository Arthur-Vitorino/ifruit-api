/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

async create(createProdutoDto: CreateProdutoDto, userId: number): Promise<Produto> {
  const categoria = await this.categoriaRepository.findOne({
    where: { id: createProdutoDto.categoriaId },
  });

  if (!categoria) {
    throw new NotFoundException(`Categoria com id ${createProdutoDto.categoriaId} não encontrada`);
  }

  const lojista = await this.userRepository.findOne({ where: { id: userId } });
  if (!lojista) {
    throw new NotFoundException(`Lojista com id ${userId} não encontrado`);
  }
  if (lojista.role !== 'MANAGER') {
    throw new UnauthorizedException('Usuário não autorizado para cadastrar produtos');
  }

  const produto = this.produtoRepository.create({
    ...createProdutoDto,
    categoria,
    lojista,
  });

  return this.produtoRepository.save(produto);
}


  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: ['categoria', 'lojista'],
    });
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria', 'lojista'],
    });

    if (!produto) {
      throw new NotFoundException(`Produto com id: ${id} não encontrado`);
    }

    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
    const produto = await this.findOne(id);

    if (updateProdutoDto.categoriaId) {
      const novaCategoria = await this.categoriaRepository.findOne({
        where: { id: updateProdutoDto.categoriaId },
      });

      if (!novaCategoria) {
        throw new NotFoundException(`Categoria com id ${updateProdutoDto.categoriaId} não encontrada`);
      }

      produto.categoria = novaCategoria;
    }

    Object.assign(produto, updateProdutoDto);
    return await this.produtoRepository.save(produto);
  }

  async remove(id: number): Promise<void> {
    const result = await this.produtoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Produto com id: ${id} não encontrado`);
    }
  }

  async favoritarProduto(produtoId: number, userId: number): Promise<string> {
  const user = await this.userRepository.findOne({
    where: { id: userId },
    relations: ['favoritos'],
  });

  if (!user) {
    throw new NotFoundException('Usuário não encontrado');
  }

  const produto = await this.produtoRepository.findOne({
    where: { id: produtoId },
  });

  if (!produto) {
    throw new NotFoundException('Produto não encontrado');
  }

  const jaFavoritado = user.favoritos?.find((p) => p.id === produto.id);

  if (jaFavoritado) {
    user.favoritos = user.favoritos.filter((p) => p.id !== produto.id);
    await this.userRepository.save(user);
    return 'Produto removido dos favoritos';
  } else {
    user.favoritos = [...(user.favoritos || []), produto];
    await this.userRepository.save(user);
    return 'Produto adicionado aos favoritos';
  }
}
async listarFavoritos(userId: number): Promise<Produto[]> {
  const user = await this.userRepository.findOne({
    where: { id: userId },
    relations: ['favoritos'],
  });

  if (!user) {
    throw new NotFoundException('Usuário não encontrado');
  }

  return user.favoritos;
}
}
