import { Connection } from 'mysql';
import { Product } from '../models/Product';

class ProductRepository {
  public connection: Connection;

  constructor(connectionDb: Connection) {
    this.connection = connectionDb;
  }

  public async findAll(): Promise<Product[]> {
    const products: Product[] = await new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM produto', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    return products;
  }

  public async create(data: Product): Promise<Product> {
    const { insertId } = await new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO produto set ? ',
        [data],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });

    const product = this.findOneById(insertId);

    return product;
  }

  public async findOneById(id: string): Promise<Product> {
    const [findProduct] = await new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM produto WHERE idProduto = ?',
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });

    if (!findProduct) return findProduct;

    const product = new Product(findProduct);

    return product;
  }

  // excluirProduto(id: any) {
  //   return new Promise((resolve, reject) => {
  //     this.connection.query(
  //       'DELETE FROM produto  WHERE idProduto = ? ',
  //       [id],
  //       (error, results) => {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(results);
  //         }
  //       },
  //     );
  //   });
  // }

  // atualizarProduto(dados: any, id: any) {
  //   return new Promise((resolve, reject) => {
  //     this.connection.query(
  //       'UPDATE produto set ? WHERE idProduto = ? ',
  //       [dados, id],
  //       (error, results) => {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(results);
  //         }
  //       },
  //     );
  //   });
  // }

  // cadastrarCategoria(dados: any) {
  //   return new Promise((resolve, reject) => {
  //     this.connection.query(
  //       'INSERT INTO categoriaProduto set ? ',
  //       [dados],
  //       (error, results) => {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(results);
  //         }
  //       },
  //     );
  //   });
  // }

  // listarCategoria() {
  //   return new Promise((resolve, reject) => {
  //     this.connection.query(
  //       'SELECT * FROM categoriaProduto',
  //       (error, results) => {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(results);
  //         }
  //       },
  //     );
  //   });
  // }

  // listaVencimento() {
  //   return new Promise((resolve, reject) => {
  //     this.connection.query(
  //       'SELECT idProduto, codigo, nome, marca, validade, lote, DATEDIFF(validade,NOW()) AS diasparavencimento FROM produto LIMIT 5;',
  //       (error, results) => {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(results);
  //         }
  //       },
  //     );
  //   });
  // }

  // qtdEstoque(id: any) {
  //   return new Promise((resolve, reject) => {
  //     this.connection.query(
  //       'SELECT qtdeEstoque FROM produto where idProduto = ?',
  //       [id],
  //       (error, results) => {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(results);
  //         }
  //       },
  //     );
  //   });
  // }
}

export { ProductRepository };
