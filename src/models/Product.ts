class Product {
  idProduto?: number;

  idCategoria: number;

  codigo: number;

  marca: string;

  nome: string;

  descricao: string;

  validade: string;

  lote: number;

  statusProduto: string;

  valor: number;

  qtdeEstoque: number;

  idFornecedor: number;

  constructor({
    idProduto,
    idCategoria,
    codigo,
    marca,
    nome,
    descricao,
    validade,
    lote,
    statusProduto,
    valor,
    qtdeEstoque,
    idFornecedor,
  }: Product) {
    this.idProduto = idProduto;
    this.idCategoria = idCategoria;
    this.codigo = codigo;
    this.marca = marca;
    this.nome = nome;
    this.descricao = descricao;
    this.validade = validade;
    this.lote = lote;
    this.statusProduto = statusProduto;
    this.valor = valor;
    this.qtdeEstoque = qtdeEstoque;
    this.idFornecedor = idFornecedor;
  }
}

export { Product };
