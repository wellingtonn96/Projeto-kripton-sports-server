import AppError from '@shared/errors/AppError';
import { Customer } from '../infra/mysql/entities/Customer';
import { CustomerRepository } from '../infra/mysql/repositories/CustomerRepository';

class FindCustomerService {
  public async execute(id: string): Promise<Customer> {
    const customerRepository = new CustomerRepository();

    const customer = await customerRepository.findOneById(id);

    if (!customer) {
      throw new AppError('Customer not Exists');
    }

    return customer;
  }
}

export { FindCustomerService };
