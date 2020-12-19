class Collaborator {
  idColaborador?: number;

  login: string;

  senha: string;

  email: string;

  nome: string;

  sobrenome: string;

  telefone: string;

  idTipo: number;

  constructor({
    idColaborador,
    login,
    senha,
    email,
    nome,
    sobrenome,
    telefone,
    idTipo,
  }: Collaborator) {
    this.idColaborador = idColaborador;
    this.login = login;
    this.senha = senha;
    this.email = email;
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.telefone = telefone;
    this.idTipo = idTipo;
  }
}

export { Collaborator };
