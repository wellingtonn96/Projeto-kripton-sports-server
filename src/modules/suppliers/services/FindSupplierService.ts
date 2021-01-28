import AppError from '@shared/errors/AppError';
import { Supplier } from '../infra/mysql/entities/Supplier';
import { SupplierRepository } from '../infra/mysql/repositories/SupplierRepository';

class FindSupplierService {
  public async execute(id: string): Promise<Supplier> {
    const supplierRepository = new SupplierRepository();

    const supplier = await supplierRepository.findOneById(id);

    if (!supplier) {
      throw new AppError('Product not Exists');
    }

    return supplier;
  }
}

export { FindSupplierService };
