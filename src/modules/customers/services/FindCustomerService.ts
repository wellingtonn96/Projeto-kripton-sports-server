import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Customer } from '../infra/mysql/entities/Customer';
import { ICustomerRepository } from '../repositories/ICustomersRepository';

@injectable()
class FindCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOneById(id);

    if (!customer) {
      throw new AppError('Customer not Exists');
    }

    return customer;
  }
}

export { FindCustomerService };
