import AppError from '@shared/errors/AppError';
import { connection } from '@shared/infra/mysql/dbConnection';
import { Product } from '../infra/mysql/entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';

class FindProductService {
  public async execute(id: string): Promise<Product> {
    const productRepository = new ProductRepository(connection());

    const product = await productRepository.findOneById(id);

    if (!product) {
      throw new AppError('Product not Exists');
    }

    return product;
  }
}

export { FindProductService };
