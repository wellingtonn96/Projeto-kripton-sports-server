import { Connection } from 'mysql';
import { Order } from '../models/Order';

class OrderRepository {
  public connection: Connection;

  constructor(connectionDb: Connection) {
    this.connection = connectionDb;
  }

  public async create(data: Order): Promise<Order> {
    const { inserId } = await new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO pedido set ? ',
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

    const order = await this.findOneById(inserId);

    return order;
  }

  public async findOneById(id: string): Promise<Order> {
    const [findOne] = await new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM pedido WHERE idPedido = ?',
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

    const orderItem = new Order(findOne);

    return orderItem;
  }

  public async updateById(id: string, data: Order): Promise<Order> {
    await new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE pedido set ? WHERE idPedido = ? ',
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

    const order = await this.findOneById(id);

    return order;
  }
}

export { OrderRepository };
