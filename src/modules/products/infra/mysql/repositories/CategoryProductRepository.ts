import { Connection } from 'mysql';
import { connection } from '@shared/infra/mysql/dbConnection';
import { ICategoryProductRepository } from '@modules/products/repositories/ICategoryProductRepository';
import { CategoryProduct } from '../entities/CategoryProduct';

class CategoryProductRepository implements ICategoryProductRepository {
  private connection: Connection;

  constructor() {
    this.connection = connection();
  }

  public async create(categoria: string): Promise<CategoryProduct> {
    const { insertId } = await new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO categoriaProduto set ? ',
        [categoria],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });

    const categoryProduct = await this.findOneById(insertId);

    return categoryProduct;
  }

  public async findOneById(id: string): Promise<CategoryProduct> {
    const [findCategoryProduct] = await new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM categoriaProduto WHERE idCategoria = ?',
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

    if (!findCategoryProduct) return findCategoryProduct;

    const categoryProduct = new CategoryProduct(findCategoryProduct);

    return categoryProduct;
  }

  public async findByName(name: string): Promise<CategoryProduct> {
    const [findCategoryProduct] = await new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM categoriaProduto WHERE categoria = ?',
        [name],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });

    if (!findCategoryProduct) return findCategoryProduct;

    const categoryProduct = new CategoryProduct(findCategoryProduct);

    return categoryProduct;
  }

  public async findAll(): Promise<CategoryProduct[]> {
    const categoriesProduct: CategoryProduct[] = await new Promise(
      (resolve, reject) => {
        this.connection.query(
          'SELECT * FROM categoriaProduto',
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

    return categoriesProduct;
  }

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

export { CategoryProductRepository };
