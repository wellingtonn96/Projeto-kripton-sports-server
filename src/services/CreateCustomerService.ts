import bcrypt from 'bcrypt';
import { connection } from '../database/dbConnection';
import AppError from '../errors/AppError';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { Customer } from '../models/Customer';

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
    const customerRepository = new CustomerRepository(connection());

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
