import AppError from '@shared/errors/AppError';
import { Supplier } from '../infra/mysql/entities/Supplier';
import { ISupplierRepository } from '../repositories/ISupplierRepository';

class UpdateSupplierService {
  constructor(private supplierRepository: ISupplierRepository) {}

  public async execute(id: string, data: Supplier): Promise<Supplier> {
    const supplierExists = await this.supplierRepository.findOneById(id);

    if (!supplierExists) {
      throw new AppError('Supplier with this id not exists!');
    }

    const supplier = await this.supplierRepository.updateById(id, data);

    return supplier;
  }
}

export { UpdateSupplierService };
