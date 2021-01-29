import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Supplier } from '../infra/mysql/entities/Supplier';
import { ISupplierRepository } from '../repositories/ISupplierRepository';

@injectable()
class FindSupplierService {
  constructor(
    @inject('SupplierRepository')
    private supplierRepository: ISupplierRepository,
  ) {}

  public async execute(id: string): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOneById(id);

    if (!supplier) {
      throw new AppError('Product not Exists');
    }

    return supplier;
  }
}

export { FindSupplierService };
