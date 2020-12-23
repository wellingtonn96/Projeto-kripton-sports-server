import { connection } from '../database/dbConnection';
import AppError from '../errors/AppError';
import { Customer } from '../models/Customer';
import { CustomerRepository } from '../repositories/CustomerRepository';

class FindCustomerService {
  public async execute(id: string): Promise<Customer> {
    const customerRepository = new CustomerRepository(connection());

    const customer = await customerRepository.findOneById(id);

    if (!customer) {
      throw new AppError('Customer not Exists');
    }

    return customer;
  }
}

export { FindCustomerService };
