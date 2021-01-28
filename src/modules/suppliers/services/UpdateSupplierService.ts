import AppError from '@shared/errors/AppError';
import { Supplier } from '../infra/mysql/entities/Supplier';
import { SupplierRepository } from '../infra/mysql/repositories/SupplierRepository';

class UpdateSupplierService {
  public async execute(id: string, data: Supplier): Promise<Supplier> {
    const supplierRepository = new SupplierRepository();

    const supplierExists = await supplierRepository.findOneById(id);

    if (!supplierExists) {
      throw new AppError('Supplier with this id not exists!');
    }

    const supplier = await supplierRepository.updateById(id, data);

    return supplier;
  }
}

export { UpdateSupplierService };
