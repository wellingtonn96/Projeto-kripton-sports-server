import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../repositories/ICustomersRepository';

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const results = await this.customerRepository.findOneById(id);

    if (!results) {
      throw new AppError('Collaborator not exists');
    }

    await this.customerRepository.deleteById(id);
  }
}

export { DeleteCustomerService };
