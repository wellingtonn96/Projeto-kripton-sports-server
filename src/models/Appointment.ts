class Appointment {
  idConsulta?: number;

  dataConsulta: Date;

  descricao: string;

  idNutricionista: number;

  idCliente: number;

  constructor({
    idConsulta,
    dataConsulta,
    descricao,
    idNutricionista,
    idCliente,
  }: Appointment) {
    this.idConsulta = idConsulta;
    this.dataConsulta = dataConsulta;
    this.descricao = descricao;
    this.idNutricionista = idNutricionista;
    this.idCliente = idCliente;
  }
}

export { Appointment };
