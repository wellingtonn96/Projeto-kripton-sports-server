import AppError from '@shared/errors/AppError';
import { Product } from '../infra/mysql/entities/Product';
import { ProductRepository } from '../infra/mysql/repositories/ProductRepository';

class FindProductService {
  public async execute(id: string): Promise<Product> {
    const productRepository = new ProductRepository();

    const product = await productRepository.findOneById(id);

    if (!product) {
      throw new AppError('Product not Exists');
    }

    return product;
  }
}

export { FindProductService };
