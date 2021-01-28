import AppError from '@shared/errors/AppError';
import { Customer } from '../infra/mysql/entities/Customer';
import { ICustomerRepository } from '../repositories/ICustomersRepository';

class UpdateCustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  public async execute(id: string, data: Customer): Promise<Customer> {
    const customerExists = await this.customerRepository.findOneById(id);

    if (!customerExists) {
      throw new AppError('customer not exists');
    }

    const customer = await this.customerRepository.updateById(id, data);

    return customer;
  }
}

export { UpdateCustomerService };
