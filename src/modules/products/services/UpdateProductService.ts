import AppError from '@shared/errors/AppError';
import { Product } from '../infra/mysql/entities/Product';
import { ProductRepository } from '../infra/mysql/repositories/ProductRepository';

class UpdateProductService {
  public async execute(id: string, data: Product): Promise<Product> {
    const productRepository = new ProductRepository();

    const productExists = await productRepository.findOneById(id);

    if (!productExists) {
      throw new AppError('Product with this id not exists!');
    }

    const product = await productRepository.updateById(id, data);

    return product;
  }
}

export { UpdateProductService };
