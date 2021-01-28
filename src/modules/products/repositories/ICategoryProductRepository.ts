import { CategoryProduct } from '../infra/mysql/entities/CategoryProduct';

export interface ICategoryProductRepository {
  create(data: string): Promise<CategoryProduct>;
  findOneById(id: string): Promise<CategoryProduct>;
  findByName(name: string): Promise<CategoryProduct>;
  findAll(): Promise<CategoryProduct[]>;
}
