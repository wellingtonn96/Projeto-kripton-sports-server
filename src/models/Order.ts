class Order {
  idPedido?: number;

  dataPedido: Date;

  idCliente: number;

  idColaborador: number;

  formaPgto: string;

  constructor({
    idPedido,
    dataPedido,
    idCliente,
    idColaborador,
    formaPgto,
  }: Order) {
    this.idPedido = idPedido;
    this.dataPedido = dataPedido;
    this.idCliente = idCliente;
    this.idColaborador = idColaborador;
    this.formaPgto = formaPgto;
  }
}

export { Order };
