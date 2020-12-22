class NutritionistChart {
  idProntuario: number;

  idConsulta: number;

  diagnostico: string;

  idNutricionista: number;

  idCliente: number;

  constructor({
    idProntuario,
    idConsulta,
    diagnostico,
    idNutricionista,
    idCliente,
  }: NutritionistChart) {
    this.idProntuario = idProntuario;
    this.idConsulta = idConsulta;
    this.diagnostico = diagnostico;
    this.idNutricionista = idNutricionista;
    this.idCliente = idCliente;
  }
}

export { NutritionistChart };
