import AppError from '@shared/errors/AppError';
import { Product } from '../infra/mysql/entities/Product';
import { IProductRepository } from '../repositories/IProductRepository';

class UpdateProductService {
  constructor(private productRepository: IProductRepository) {}

  public async execute(id: string, data: Product): Promise<Product> {
    const productExists = await this.productRepository.findOneById(id);

    if (!productExists) {
      throw new AppError('Product with this id not exists!');
    }

    const product = await this.productRepository.updateById(id, data);

    return product;
  }
}

export { UpdateProductService };
