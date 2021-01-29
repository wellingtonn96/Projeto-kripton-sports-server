import { Connection } from 'mysql';
import { connection } from '@shared/infra/mysql/dbConnection';
import { Supplier } from '../entities/Supplier';

class SupplierRepository {
  private connection: Connection;

  constructor() {
    this.connection = connection();
  }

  public async findAll(): Promise<Supplier[]> {
    const supplier: Supplier[] = await new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM fornecedor ORDER BY idFornecedor DESC',
        (error, results) => {
          if (error) {
            reject(error);
          } else resolve(results);
        },
      );
    });

    return supplier;
  }

  public async create(data: Supplier): Promise<Supplier> {
    const { insertId } = await new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO fornecedor set ?',
        [data],
        (error, results) => {
          if (error) {
            reject(error);
          } else resolve(results);
        },
      );
    });

    const supplier = await this.findOneById(insertId);

    return supplier;
  }

  public async findOneById(id: string): Promise<Supplier> {
    const [findOne] = await new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM fornecedor WHERE idFornecedor = ?',
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

    if (!findOne) return findOne;

    const supplier = new Supplier(findOne);

    return supplier;
  }

  public async findByEmail(email: string): Promise<Supplier> {
    const [findOne] = await new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM fornecedor WHERE email = ?',
        [email],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });

    if (!findOne) return findOne;

    const supplier = new Supplier(findOne);

    return supplier;
  }

  public async deleteById(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM fornecedor WHERE idFornecedor = ?',
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

  public async updateById(id: string, data: Supplier): Promise<Supplier> {
    await new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE fornecedor set ? WHERE idFornecedor = ? ',
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

    const supplier = await this.findOneById(id);

    return supplier;
  }
}

export { SupplierRepository };
