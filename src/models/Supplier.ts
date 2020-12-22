class Supplier {
  idFornecedor?: number;

  cnpj: string;

  email: string;

  endereco: string;

  telefone: string;

  constructor({ idFornecedor, cnpj, email, endereco, telefone }: Supplier) {
    this.idFornecedor = idFornecedor;
    this.cnpj = cnpj;
    this.email = email;
    this.endereco = endereco;
    this.telefone = telefone;
  }
}

export { Supplier };
