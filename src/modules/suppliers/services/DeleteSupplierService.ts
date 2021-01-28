import AppError from '@shared/errors/AppError';
import { ISupplierRepository } from '../repositories/ISupplierRepository';

class DeleteSupplierService {
  constructor(private supplierRepository: ISupplierRepository) {}

  public async execute(id: string): Promise<void> {
    const supplierExists = await this.supplierRepository.findOneById(id);

    if (!supplierExists) {
      throw new AppError('supplier not exists');
    }

    await this.supplierRepository.deleteById(id);
  }
}

export { DeleteSupplierService };
