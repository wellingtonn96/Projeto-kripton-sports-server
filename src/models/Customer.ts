class Customer {
  idCliente?: number;

  login: string;

  senha: string;

  email: string;

  nome: string;

  sobrenome: string;

  telefone: string;

  constructor({
    idCliente,
    login,
    senha,
    email,
    nome,
    sobrenome,
    telefone,
  }: Customer) {
    this.idCliente = idCliente;
    this.login = login;
    this.senha = senha;
    this.email = email;
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.telefone = telefone;
  }
}

export { Customer };
