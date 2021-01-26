import { connection } from '@shared/infra/mysql/dbConnection';
import AppError from '@shared/errors/AppError';
import { Supplier } from '../infra/mysql/entities/Supplier';
import { SupplierRepository } from '../repositories/SupplierRepository';

class UpdateSupplierService {
  public async execute(id: string, data: Supplier): Promise<Supplier> {
    const supplierRepository = new SupplierRepository(connection());

    const supplierExists = await supplierRepository.findOneById(id);

    if (!supplierExists) {
      throw new AppError('Supplier with this id not exists!');
    }

    const supplier = await supplierRepository.updateById(id, data);

    return supplier;
  }
}

export { UpdateSupplierService };
