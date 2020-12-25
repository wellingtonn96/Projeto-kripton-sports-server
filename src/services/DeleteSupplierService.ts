import { connection } from '../database/dbConnection';
import AppError from '../errors/AppError';
import { SupplierRepository } from '../repositories/SupplierRepository';

class DeleteSupplierService {
  public async execute(id: string): Promise<void> {
    const supplierRepository = new SupplierRepository(connection());

    const supplierExists = await supplierRepository.findOneById(id);

    if (!supplierExists) {
      throw new AppError('supplier not exists');
    }

    await supplierRepository.deleteById(id);
  }
}

export { DeleteSupplierService };