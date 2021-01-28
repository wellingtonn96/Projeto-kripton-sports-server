import AppError from '@shared/errors/AppError';
import { CustomerRepository } from '../infra/mysql/repositories/CustomerRepository';
import { Customer } from '../infra/mysql/entities/Customer';

class UpdateCustomerService {
  public async execute(id: string, data: Customer): Promise<Customer> {
    const customerRepository = new CustomerRepository();

    const customerExists = await customerRepository.findOneById(id);

    if (!customerExists) {
      throw new AppError('customer not exists');
    }

    const customer = await customerRepository.updateById(id, data);

    return customer;
  }
}

export { UpdateCustomerService };
