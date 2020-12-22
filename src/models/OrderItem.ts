class OrderItem {
  idItemPedido?: number;

  idPedido: number;

  codProduto: number;

  quantidade: number;

  valorUnitario: number;

  constructor({
    idItemPedido,
    idPedido,
    codProduto,
    quantidade,
    valorUnitario,
  }: OrderItem) {
    this.idItemPedido = idItemPedido;
    this.idPedido = idPedido;
    this.codProduto = codProduto;
    this.quantidade = quantidade;
    this.valorUnitario = valorUnitario;
  }
}

export { OrderItem };
