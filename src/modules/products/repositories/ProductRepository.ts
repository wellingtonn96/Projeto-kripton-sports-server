import { Connection } from 'mysql';
import { Product } from '../models/Product';

interface ProductExipirationDate {
  idProduto: number;
  codigo: number;
  nome: string;
  marca: string;
  validade: string;
  lote: number;
  diasparavencimento: number;
}

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

  public async deleteById(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM produto WHERE idProduto = ? ',
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
  }

  public async updateById(id: string, data: Product): Promise<Product> {
    await new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE produto set ? WHERE idProduto = ? ',
        [data, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });

    const product = await this.findOneById(id);

    return product;
  }

  public async getExpirationDate(): Promise<ProductExipirationDate> {
    const products: ProductExipirationDate = await new Promise(
      (resolve, reject) => {
        this.connection.query(
          'SELECT idProduto, codigo, nome, marca, validade, lote, DATEDIFF(validade,NOW()) AS diasparavencimento FROM produto LIMIT 5;',
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          },
        );
      },
    );

    return products;
  }
}

export { ProductRepository };
