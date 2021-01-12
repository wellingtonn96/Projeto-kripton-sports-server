import { connection } from '../database/dbConnection';
import AppError from '../errors/AppError';
import { CustomerRepository } from '../repositories/CustomerRepository';

class DeleteCustomerService {
  public async execute(id: string): Promise<void> {
    const customerRepository = new CustomerRepository(connection());

    const results = await customerRepository.findOneById(id);

    if (!results) {
      throw new AppError('Collaborator not exists');
    }

    await customerRepository.deleteById(id);
  }
}

export { DeleteCustomerService };
