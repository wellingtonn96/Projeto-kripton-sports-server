export interface ICreateProductDTO {
  idCategoria: number;
  codigo: number;
  marca: string;
  nome: string;
  produto_img?: string;
  descricao: string;
  validade: string;
  lote: number;
  statusProduto: string;
  valor: number;
  qtdeEstoque: number;
  idFornecedor: number;
}
