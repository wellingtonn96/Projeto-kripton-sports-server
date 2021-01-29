import bcrypt from 'bcrypt';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Customer } from '../infra/mysql/entities/Customer';
import { ICustomerRepository } from '../repositories/ICustomersRepository';

interface IRequest {
  login: string;
  senhaEncrypt: string;
  email: string;
  nome: string;
  sobrenome: string;
  telefone: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({
    login,
    senhaEncrypt,
    email,
    nome,
    sobrenome,
    telefone,
  }: IRequest): Promise<Customer> {
    const results = await this.customerRepository.findByLogin(login);

    if (results) {
      throw new AppError('Customer already exists');
    }

    const encryptedPassword = await bcrypt.hash(senhaEncrypt, 8);

    const customer = await this.customerRepository.create({
      login,
      senha: encryptedPassword,
      email,
      nome,
      sobrenome,
      telefone,
    });

    return customer;
  }
}

export { CreateCustomerService };
