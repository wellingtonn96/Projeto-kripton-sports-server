import { Connection } from 'mysql';
import { OrderItem } from '../models/OrderItem';

class OrderItemRepository {
  public connection: Connection;

  constructor(connectionDb: Connection) {
    this.connection = connectionDb;
  }

  public async create(data: OrderItem): Promise<OrderItem> {
    const { inserId } = await new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO itemPedido set ? ',
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

    const orderItem = await this.findOneById(inserId);

    return orderItem;
  }

  public async findOneById(id: string): Promise<OrderItem> {
    const [findOne] = await new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM itemPedido WHERE idItemPedido = ?',
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

    const orderItem = new OrderItem(findOne);

    return orderItem;
  }

  public async findByOrderId(id: string): Promise<void> {
    const [findOne] = await new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT itemPedido.idItemPedido, produto.nome, produto.codigo, produto.valor, itemPedido.quantidade, itemPedido.valorUnitario, itemPedido.quantidade * produto.valor AS soma, Sum(itemPedido.quantidade * itemPedido.valorUnitario) AS subtotal' +
          ' FROM itemPedido INNER JOIN produto ON itemPedido.codProduto = produto.idProduto WHERE itemPedido.idPedido = ? GROUP BY itemPedido.idItemPedido ORDER BY itemPedido.idItemPedido DESC;',
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

    return findOne;
  }

  /*
	cancelarItem(id){
		return new Promise((resolve, reject)=>{
			this.connection.query('DELETE FROM itemPedido WHERE idItemPedido = ?;',
			[id],
			(error, results)=>{
				if(error){
					reject(error)
				}else{
					resolve(results)
				}
			})
		})
	}
	*/
}

export { OrderItemRepository };
