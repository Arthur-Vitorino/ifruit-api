export interface Categoria {
    id: number;
    nome: string;
    ative: boolean;
}

export interface Produto {
    id: number;
    nome: string;
    preco: number;
    emailEmpresa: string;
    dataValidade: string;
    criadoEm: string;
    categoria: Categoria;
    categoriaId: number;
}