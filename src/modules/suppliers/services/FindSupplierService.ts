import AppError from '@shared/errors/AppError';
import { Supplier } from '../infra/mysql/entities/Supplier';
import { ISupplierRepository } from '../repositories/ISupplierRepository';

class FindSupplierService {
  constructor(private supplierRepository: ISupplierRepository) {}

  public async execute(id: string): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOneById(id);

    if (!supplier) {
      throw new AppError('Product not Exists');
    }

    return supplier;
  }
}

export { FindSupplierService };
