class CategoryProduct {
  idCategoria?: number;

  categoria: string;

  constructor({ idCategoria, categoria }: CategoryProduct) {
    this.idCategoria = idCategoria;
    this.categoria = categoria;
  }
}

export { CategoryProduct };
