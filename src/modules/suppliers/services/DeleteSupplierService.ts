import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ISupplierRepository } from '../repositories/ISupplierRepository';

@injectable()
class DeleteSupplierService {
  constructor(
    @inject('SupplierRepository')
    private supplierRepository: ISupplierRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const supplierExists = await this.supplierRepository.findOneById(id);

    if (!supplierExists) {
      throw new AppError('supplier not exists');
    }

    await this.supplierRepository.deleteById(id);
  }
}

export { DeleteSupplierService };
