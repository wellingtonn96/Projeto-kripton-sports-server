class Nutritionist {
  idNutricionista: number;

  crn: number;

  idColaborador: number;

  constructor({ idNutricionista, crn, idColaborador }: Nutritionist) {
    this.idNutricionista = idNutricionista;
    this.crn = crn;
    this.idColaborador = idColaborador;
  }
}

export { Nutritionist };
