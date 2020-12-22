class Address {
  idEndereco?: number;

  rua: string;

  cidade: string;

  numero: number;

  estado: string;

  idCliente: number;

  constructor({ idEndereco, rua, cidade, numero, estado, idCliente }: Address) {
    this.idEndereco = idEndereco;
    this.rua = rua;
    this.cidade = cidade;
    this.numero = numero;
    this.estado = estado;
    this.idCliente = idCliente;
  }
}

export { Address };
