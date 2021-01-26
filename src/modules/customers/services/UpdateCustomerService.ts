import { connection } from '@shared/infra/mysql/dbConnection';
import AppError from '@shared/errors/AppError';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { Customer } from '../infra/mysql/entities/Customer';

class UpdateCustomerService {
  public async execute(id: string, data: Customer): Promise<Customer> {
    const customerRepository = new CustomerRepository(connection());

    const customerExists = await customerRepository.findOneById(id);

    if (!customerExists) {
      throw new AppError('customer not exists');
    }

    const customer = await customerRepository.updateById(id, data);

    return customer;
  }
}

export { UpdateCustomerService };
