import { Supplier } from '../infra/mysql/entities/Supplier';

export interface ISupplierRepository {
  findAll(): Promise<Supplier[]>;
  create(data: Supplier): Promise<Supplier>;
  findOneById(id: string): Promise<Supplier>;
  findByEmail(email: string): Promise<Supplier>;
  deleteById(id: string): Promise<void>;
  updateById(id: string, data: Supplier): Promise<Supplier>;
}
