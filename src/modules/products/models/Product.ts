class Product {
  idProduto?: number;

  idCategoria: number;

  codigo: number;

  marca: string;

  nome: string;

  produto_img?: string | undefined;

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
    produto_img,
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
    this.produto_img = produto_img;
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
