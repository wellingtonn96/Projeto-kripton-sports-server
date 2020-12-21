import { connection } from '../database/dbConnection';
import AppError from '../errors/AppError';
import { Product } from '../models/Product';
import { ProductRepository } from '../repositories/ProductRepository';

class UpdateProductService {
  public async execute(id: string, data: Product): Promise<Product> {
    const productRepository = new ProductRepository(connection());

    const productExists = await productRepository.findOneById(id);

    if (!productExists) {
      throw new AppError('Product with this id not exists!');
    }

    const product = await productRepository.updateById(id, data);

    return product;
  }
}

export { UpdateProductService };
