import { connection } from '../database/dbConnection';
import AppError from '../errors/AppError';
import { Supplier } from '../models/Supplier';
import { SupplierRepository } from '../repositories/SupplierRepository';

class FindSupplierService {
  public async execute(id: string): Promise<Supplier> {
    const supplierRepository = new SupplierRepository(connection());

    const supplier = await supplierRepository.findOneById(id);

    if (!supplier) {
      throw new AppError('Product not Exists');
    }

    return supplier;
  }
}

export { FindSupplierService };
