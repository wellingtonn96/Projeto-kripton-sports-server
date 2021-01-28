import { ICreateCustomerDTO } from '@modules/customers/dtos/ICreateCustomerDTO';
import { ICustomerRepository } from '@modules/customers/repositories/ICustomersRepository';
import { Connection } from 'mysql';
import { connection } from '@shared/infra/mysql/dbConnection';
import { Customer } from '../entities/Customer';

class CustomerRepository implements ICustomerRepository {
  private connection: Connection;

  constructor() {
    this.connection = connection();
  }

  public async findAll(): Promise<Customer[]> {
    const customers: Customer[] = await new Promise((resolve, reject) => {
      this.connection.query('select * from cliente', (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    return customers;
  }

  public async create(data: ICreateCustomerDTO): Promise<Customer> {
    const { insertId } = await new Promise((resolve, reject) => {
      this.connection.query(
        'insert into cliente set ? ',
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

    const customer = await this.findOneById(insertId);

    return customer;
  }

  public async deleteById(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM cliente  WHERE idCliente = ? ',
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

  public async findOneById(id: string): Promise<Customer> {
    const [findCustomer] = await new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM cliente WHERE idCliente = ?',
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

    if (!findCustomer) return findCustomer;

    const customer = new Customer(findCustomer);

    return customer;
  }

  public async findByLogin(login: string): Promise<Customer> {
    const [findCustomer] = await new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM cliente WHERE login = ?',
        [login],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });

    if (!findCustomer) return findCustomer;

    const customer = new Customer(findCustomer);

    return customer;
  }

  public async updateById(id: string, data: Customer): Promise<Customer> {
    await new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE cliente set ? WHERE idCliente = ? ',
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

    const customer = await this.findOneById(id);

    return customer;
  }
}

export { CustomerRepository };
