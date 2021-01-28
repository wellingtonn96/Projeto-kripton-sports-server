import AppError from '@shared/errors/AppError';
import { SupplierRepository } from '../infra/mysql/repositories/SupplierRepository';

class DeleteSupplierService {
  public async execute(id: string): Promise<void> {
    const supplierRepository = new SupplierRepository();

    const supplierExists = await supplierRepository.findOneById(id);

    if (!supplierExists) {
      throw new AppError('supplier not exists');
    }

    await supplierRepository.deleteById(id);
  }
}

export { DeleteSupplierService };
