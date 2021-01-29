import { Customer } from '../infra/mysql/entities/Customer';
import { ICreateCustomerDTO } from '../dtos/ICreateCustomerDTO';

export interface ICustomerRepository {
  findAll(): Promise<Customer[]>;
  create(data: ICreateCustomerDTO): Promise<Customer>;
  deleteById(id: string): Promise<void>;
  findOneById(id: string): Promise<Customer>;
  findByLogin(login: string): Promise<Customer>;
  updateById(id: string, data: ICreateCustomerDTO): Promise<Customer>;
}
