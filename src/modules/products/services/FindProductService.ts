import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Product } from '../infra/mysql/entities/Product';
import { IProductRepository } from '../repositories/IProductRepository';

@injectable()
class FindProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findOneById(id);

    if (!product) {
      throw new AppError('Product not Exists');
    }

    return product;
  }
}

export { FindProductService };
