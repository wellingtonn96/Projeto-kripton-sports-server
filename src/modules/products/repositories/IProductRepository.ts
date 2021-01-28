import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { Product } from '../infra/mysql/entities/Product';
import { ProductExipirationDate } from '../infra/mysql/repositories/ProductRepository';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  create(data: ICreateProductDTO): Promise<Product>;
  findOneById(id: string): Promise<Product>;
  deleteById(id: string): Promise<void>;
  updateById(id: string, data: ICreateProductDTO): Promise<Product>;
  getExpirationDate(): Promise<ProductExipirationDate>;
}
