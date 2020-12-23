import { SupplierRepository } from '../repositories/SupplierRepository';
import { connection } from '../database/dbConnection';
import AppError from '../errors/AppError';
import { Supplier } from '../models/Supplier';

interface IRequest {
  telefone: string;
  cnpj: string;
  email: string;
  endereco: string;
}

class CreateSupplierService {
  public async execute({
    telefone,
    cnpj,
    email,
    endereco,
  }: IRequest): Promise<Supplier> {
    const supplierRepository = new SupplierRepository(connection());

    const results = await supplierRepository.findByEmail(email);

    if (results) {
      throw new AppError('Supplier already exists');
    }

    const supplier = await supplierRepository.create({
      telefone,
      cnpj,
      email,
      endereco,
    });

    return supplier;
  }
}

export { CreateSupplierService };
