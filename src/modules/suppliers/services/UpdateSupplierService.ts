import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Supplier } from '../infra/mysql/entities/Supplier';
import { ISupplierRepository } from '../repositories/ISupplierRepository';

@injectable()
class UpdateSupplierService {
  constructor(
    @inject('SupplierRepository')
    private supplierRepository: ISupplierRepository,
  ) {}

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
