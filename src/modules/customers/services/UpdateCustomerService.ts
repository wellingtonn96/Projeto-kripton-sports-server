import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Customer } from '../infra/mysql/entities/Customer';
import { ICustomerRepository } from '../repositories/ICustomersRepository';

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

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
