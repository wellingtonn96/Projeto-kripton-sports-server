import { connection } from '../database/dbConnection';
import AppError from '../errors/AppError';
import { ProductRepository } from '../repositories/ProductRepository';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productRepository = new ProductRepository(connection());

    const productExists = await productRepository.findOneById(id);

    if (!productExists) {
      throw new AppError('Product not exists');
    }

    await productRepository.deleteById(id);
  }
}

export { DeleteProductService };
