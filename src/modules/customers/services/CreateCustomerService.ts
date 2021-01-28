import bcrypt from 'bcrypt';
import AppError from '@shared/errors/AppError';
import { CustomerRepository } from '../infra/mysql/repositories/CustomerRepository';
import { Customer } from '../infra/mysql/entities/Customer';

interface IRequest {
  login: string;
  senhaEncrypt: string;
  email: string;
  nome: string;
  sobrenome: string;
  telefone: string;
}

class CreateCustomerService {
  public async execute({
    login,
    senhaEncrypt,
    email,
    nome,
    sobrenome,
    telefone,
  }: IRequest): Promise<Customer> {
    const customerRepository = new CustomerRepository();

    const results = await customerRepository.findByLogin(login);

    if (results) {
      throw new AppError('Customer already exists');
    }

    const encryptedPassword = await bcrypt.hash(senhaEncrypt, 8);

    const customer = await customerRepository.create({
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
